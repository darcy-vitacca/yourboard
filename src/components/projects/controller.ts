import { Request, Response } from 'express';
import User from '../../entities/User';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';
import Link from '../../entities/Link';

export const getProject = async (req: Request, res: Response) => {
  const name = req.params.name;
  const user: User = res.locals.user;
  try {
    const project = await Project.findOneOrFail({ url_name: name });
    const links = await Link.find({
      where: { project_id: project.project_id },
      order: { position: 'DESC' },
      // relations: ['links', 'subfolders'],
    });
    project.links = links;
    console.log('project', project);
    //get project via name and uuid
    console.log('user', user);
    console.log('name', name);

    //get links
    return res.json(project);
  } catch (err) {
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
      errors.project_name =
        'URL name already exists please choose a different one.';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const project = await new Project({
      description,
      project_name,
      url_name,
      user,
    });
    await project.save();

    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
