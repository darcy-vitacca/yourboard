import { Request, Response } from 'express';
import User from '../../entities/User';
import Link from '../../entities/Link';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';
import { getConnection } from 'typeorm';

export const createLink = async (req: Request, res: Response) => {
  // const { url_name, url, url_image, position } = req.body[0];
  const name = req.params.project;
  const user: User = res.locals.user;
  try {
    const links = req.body;
    let errors: any = {};
    // if (isEmpty(url)) errors.description = 'URL must not be empty';
    // if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const project = await Project.findOne({ url_name: name });
    const updatedLinks = await req.body.map((item: any) => {
      return { ...item, user, project_id: project?.project_id };
    });

    const bulkInsert = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Link)
      .values(updatedLinks)
      .execute();

    return res.status(200).json(bulkInsert);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
