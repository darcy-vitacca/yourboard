import { Request, Response } from 'express';
import User from '../../entities/User';
import Link from '../../entities/Link';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';

export const getLinks = async (req: Request, res: Response) => {
  try {
    console.log('hit');
    return req;
  } catch (err) {
    console.log('here');
    console.log(err);
  }
};

export const createLink = async (req: Request, res: Response) => {
  const { url_name, url, url_image, position } = req.body[0];
  const name = req.params.project;
  const user: User = res.locals.user;
  try {
    let errors: any = {};
    if (isEmpty(url)) errors.description = 'URL must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const project = await Project.findOne({ url_name: name });

    const link = await new Link({
      url_name,
      url,
      url_image,
      position,
      user,
      project_id: project?.project_id,
    });
    await link.save();

    return res.json(link);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
