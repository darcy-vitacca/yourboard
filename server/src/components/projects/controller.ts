import { Request, Response } from 'express';
import User from '../../entities/User';
import isEmpty from 'lodash/isEmpty'
import Project from '../../entities/Project';
import Link from '../../entities/Link';
import ProjectUser from '../../entities/ProjectUser';
import sgMail from '@sendgrid/mail';
import Friends from '../../entities/Friends';
import { getConnection } from 'typeorm';
import { defaultProject } from '../../utils/constants/project-constants';

sgMail.setApiKey(process.env.SEND_GRID_API ?? '');

export const getProject = async (req: Request, res: Response) => {
  const name = req.params.name;
  const user: User = res.locals.user;
  try {
    const project = await Project.findOneOrFail({ url_name: name });
    const links = await Link.find({
      where: { project_id: project.project_id },
      order: { position: 'ASC' },
      // relations: ['links', 'subfolders'],
    });
    project.links = links;

    //get links
    return res.status(200).json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ project: 'Project not found' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { description, project_name, url_name } = req.body;
  const user: User = res.locals.user;
  try {
    let errors: any = {};
    if (isEmpty(description))
      errors.description = 'Description must not be empty';
    if (isEmpty(project_name))
      errors.project_name = 'Project name must not be empty';
    if (isEmpty(url_name)) errors.url_name = 'URL name must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const projectCheck = await Project.findOne({ url_name });
    if (projectCheck)
      errors.url_name =
        'URL name already exists please choose a different one.';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const project = await new Project({
      description,
      project_name,
      url_name,
      user,
    });
    await project.save();
    const projectUsers = await new ProjectUser({
      full_name: `${user.firstName} ${user.lastName}`,
      status: true,
      project_id: project?.project_id,
      owner: true,
      email: user.email,
      user_id: user.user_id,
    });
    await projectUsers.save();

    return res.json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getProjects = async (_: Request, res: Response) => {
  try {

    const user: User = res.locals.user;
    let projects;

    const projectsUser = await ProjectUser.find({
      select: ['project_id'],
      where: { user_id: user.user_id },
      order: { createdAt: 'DESC' },
    });

    if (!isEmpty(projectsUser)) {
      projects = await Project.find({
        where: projectsUser,
        order: { createdAt: 'DESC' },
        relations: ['links', 'project_users'],
      });
      console.log('projects', projects);
    } else {
      projects = [defaultProject]
    }

    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ project: 'Projects not found' });
  }
};

export const inviteUserToProject = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
    const { email, project_id, project_name } = req.body;

    let emailToSend;
    let invitedUserDetails;
    let completionMessage = {
      message: '',
    };

    const emailUserExists = await User.findOne({ email });

    if (emailUserExists) {
      emailToSend = {
        replyTo: `urboardinfo@gmail.com`,
        from: `urboardinfo@gmail.com`,
        to: `${email}`,
        subject: `urboard invite from ${user.firstName} ${user.lastName}`,
        html: `<h3>You've been invited to a new urboard</h3>
              <p>Hi,</p>
              <p>${user.firstName} ${user.lastName} has invited you to ${project_name} collabarate here: 
              <a href='https://urboard.co'>https://urboard.co</a>.</p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
      };
      const userFriends = await Friends.findOne({
        where: { user_1_id: user.user_id, user_2_email: email },
      });

      invitedUserDetails = await User.findOne({
        select: ['user_id', 'firstName', 'lastName', 'user_id'],
        where: { email: email },
      });


      if (!invitedUserDetails) {
        return res.status(404).json({ user: 'User not found' });
      }

      //If they aren't friends create and entry
      if (!userFriends) {
        const friendsData = [
          {
            user_1_name: `${user.firstName} ${user.lastName}`,
            user_1_id: user.user_id,
            user_1_email: user.email,
            user_2_name: `${invitedUserDetails?.firstName} ${invitedUserDetails?.lastName}`,
            user_2_id: invitedUserDetails.user_id,
            user_2_email: email,
            project_id: project_id,
            accepted: true,
          },
          {
            user_1_name: `${invitedUserDetails?.firstName} ${invitedUserDetails?.lastName}`,
            user_1_id: invitedUserDetails.user_id,
            user_1_email: email,
            user_2_name: `${user.firstName} ${user.lastName}`,
            user_2_id: user.user_id,
            user_2_email: user.email,
            project_id: project_id,
            accepted: true,
          },
        ];

        const bulkInsert = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Friends)
          .values(friendsData)
          .execute();
      }
    } else {
      emailToSend = {
        replyTo: `urboardinfo@gmail.com`,
        from: `urboardinfo@gmail.com`,
        to: `${email}`,
        subject: `urboard invite from ${user.firstName} ${user.lastName}`,
        html: `<h3>Join urboard today</h3>
              <p>Hi,</p>
              <p>${user.firstName} ${user.lastName} has invited you to ${project_name} to collabarate please register here: 
              <a href=https://urboard.co/register?user=${email}>https://urboard.co/register</a>.</p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
      };
    }

    // send email
    const emailRes = await sgMail
      .send(emailToSend)
      .then((response) => console.log('response', response))
      .catch((error) => {
        return error;
      });


    const projectUsers = await new ProjectUser({
      status: !isEmpty(invitedUserDetails),
      project_id: project_id,
      owner: false,
      email: email,
      ...(!isEmpty(invitedUserDetails) && { user_id:   invitedUserDetails?.user_id,
        full_name: `${invitedUserDetails?.firstName} ${invitedUserDetails?.lastName}` })
    });

    await projectUsers.save();
    completionMessage.message = 'Success';

    return res.status(200).json(completionMessage);
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ project: 'Project not found' });
  }
};
