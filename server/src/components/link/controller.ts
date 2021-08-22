import { Request, Response } from 'express';
import User from '../../entities/User';
import Link from '../../entities/Link';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';
import { getConnection } from 'typeorm';

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
  console.log('req.body', req.body);

  // const { url_name, url, url_image, position } = req.body[0];
  const name = req.params.project;
  const user: User = res.locals.user;
  try {
    const links = req.body;
    let errors: any = {};
    // if (isEmpty(url)) errors.description = 'URL must not be empty';
    // if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const project = await Project.findOne({ url_name: name });
    const updatedLinks = await req.body.map((item) => {
      return { ...item, user, project_id: project?.project_id };
    });
    console.log('updateLinks', updatedLinks);

    const bulkInsert = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Link)
      .values(updatedLinks)
      .execute();
    console.log('bulkInsert', bulkInsert);

    return res.status(200).json(bulkInsert);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
