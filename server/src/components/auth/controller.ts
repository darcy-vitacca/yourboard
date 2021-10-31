import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import User from '../../entities/User';
import { validate, isEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import ProjectUser from '../../entities/ProjectUser';
import sgMail from '@sendgrid/mail';
import PasswordRequest from '../../entities/PasswordRequest';

sgMail.setApiKey(process.env.SEND_GRID_API ?? '');

const mapErrors = (errors: Object[]) => {
  //Returns
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    let errors: any = {};
    if (isEmpty(email)) errors.email = 'Email must not be empty';
    if (isEmpty(username)) errors.username = 'Username must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';
    if (isEmpty(firstName)) errors.firstName = 'First name must not be empty';
    if (isEmpty(lastName)) errors.lastName = 'Last must not be empty';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const emailUserExists = await User.findOne({ email });
    const usernameUserExists = await User.findOne({ username });
    if (emailUserExists) errors.email = 'Email is already taken';
    if (usernameUserExists) errors.username = 'Username is already taken';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const user = new User({ email, username, password, firstName, lastName });
    errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }
    await user.save();

    await getConnection()
      .createQueryBuilder()
      .update(ProjectUser)
      .set({
        status: true,
        user_id: user.user_id,
        full_name: `${user.firstName} ${user.lastName}`,
      })
      .where('email = :email', { email: email })
      .execute();

    return res.json(user);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(err);
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let errors: any = {};

    if (isEmpty(email)) errors.email = 'Email must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: 'Email not found' });

    //hashes input and compares new password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).json({ password: 'Password is incorrect' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET!);

    //res.set sets the header. Http only sets it so it can't be accessed by javascript
    //means it should only pass through https is true, the path says online
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
    );

    return res.json(user);
  } catch (err: any) {
    console.log(err);
    return res.json({ error: 'Something went wrong' });
  }
};

export const me = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};
export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );
  return res.status(200).json({ success: true });
};

export const forgot = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: 'Email not found' });

    const id = uuidv4();
    const request = {
      id,
      email,
    };

    const addPasswordRequest = await new PasswordRequest(request);
    if (addPasswordRequest) {
      await addPasswordRequest.save();
      const emailToSend = {
        replyTo: `urboardinfo@gmail.com`,
        from: `urboardinfo@gmail.com`,
        to: `${email}`,
        subject: `urboard reset password`,
        html: `
              <p>Hi,</p>
              <p>To reset your password please click on this link : 
              <a href=https://urboard.co/reset/${id}>https://urboard.co/reset<a></p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
      };
      // send email
      const emailRes = await sgMail
        .send(emailToSend)
        .then((response) => console.log('response', response))
        .catch((error) => {
          return error;
        });
    }

    return res.json({
      email: 'Email successfully sent please reset password from link',
    });
  } catch (err: any) {
    console.log(err);
    return res.json({ error: 'Something went wrong' });
  }
};

export const reset = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  let errors: any = {};
  try {
    if (isEmpty(password)) errors.password = 'Password must not be empty';
    if (isEmpty(id)) errors.id = 'Please try to reset your password again';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const resetRequest = await PasswordRequest.findOneOrFail(id);
    if (!resetRequest) {
      return res
        .status(404)
        .json({ resetRequest: 'Please try to reset your password again' });
    } else {
      const user = await User.findOne({ email: resetRequest?.email });
      if (!user) return res.status(404).json({ email: 'User not found' });
      user.password = await bcrypt.hash(password, 6);
      await user.save();
      await resetRequest.remove();
    }
    return res.json({ email: 'Success' });
  } catch (err: any) {
    return res.json({ error: 'Something went wrong' });
  }
};

export const contact = async (req: Request, res: Response) => {
  const { email, name, message } = req.body;
  try {
    let errors: any = {};
    const emailToSend = {
      replyTo: `${email}`,
      from: `urboardinfo@gmail.com`,
      to: `urboardinfo@gmail.com`,
      subject: `urboard message`,
      html: `
              <p>A message from : ${name}</p>
              <p>The message they sent is : </p>
              <p>${message}</p>
              <p>Reply to this : ${email}</p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
    };
    const emailRes = await sgMail
      .send(emailToSend)
      .then((response) => console.log('response', response))
      .catch((error) => {
        return error;
      });
    return res.json({
      success:
        'Contacted successfully, we will endeavour to get back to you as soon as possible.',
    });
  } catch (err: any) {
    return res.json({ error: 'Something went wrong' });
  }
};
