import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import User from '../../entities/User';
import { validate, isEmpty } from 'class-validator';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import ProjectUser from '../../entities/ProjectUser';

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
    console.log('user', user);
    debugger;

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
        maxAge: 3600,
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
