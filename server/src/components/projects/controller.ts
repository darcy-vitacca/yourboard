import { Request, Response } from 'express';
import User from '../../entities/User';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';
import Link from '../../entities/Link';
import ProjectUser from '../../entities/ProjectUser';
import nodemailer from 'nodemailer';

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
    //get project via name and uuid

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
      owner: false,
      email: user.email,
    });
    await projectUsers.save();

    return res.json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getProjects = async (_: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
    const projects = await Project.find({
      where: { user_id: user.user_id },
      order: { createdAt: 'DESC' },
      relations: ['links', 'project_users'],
    });

    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ project: 'Project not found' });
  }
};

export const inviteUserToProject = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
    const { email } = req.body;
    // TODO
    // Validate your data
    // Add User to project_users
    // If success use node_mailer to email to send an invite
    let completionMessage = {
      message: '',
    };

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailToSend = {
      replyTo: `urboardinfo@gmail.com`,
      from: `urboardinfo@gmail.com`,
      to: `urboardinfo@gmail.com`,
      subject: `urboard invite from ${user.firstName} ${user.lastName}`,
      html: `<h3>Join urboard today</h3>
              <p>Hi,</p>
              <p>${user.firstName} ${user.lastName} has invited you to urboard to collabarate please register here: 
              <a href="https://urboard.co/register">https://urboard.co/register</a>.</p>
              <p>thanks,</p>
              <p>urboard team.</p>`,
    };

    transporter.sendMail(emailToSend, (err: any, info: any) => {
      if (err) {
        completionMessage.message = `Failure ${err}`;
      }
    });
    completionMessage.message = 'Success';

    return res.status(200).json(completionMessage);
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ project: 'Project not found' });
  }
};

//When they register check the table and change all data
//Get projects should use project_users to find the project ids first
