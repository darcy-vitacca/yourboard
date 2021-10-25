import { Request, Response } from 'express';
import User from '../../entities/User';
import Link from '../../entities/Link';
import { isEmpty } from 'class-validator';
import Project from '../../entities/Project';
import { getConnection } from 'typeorm';

export const createLink = async (req: Request, res: Response) => {
  // const { url_name, url, url_image, position } = req.body[0];
  const project_id = req.params.project_id;
  const user: User = res.locals.user;
  try {
    let errors: any = {};
    // if (isEmpty(url)) errors.description = 'URL must not be empty';
    // if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const updatedLinks = await req.body.map((item: any) => {
      return { ...item, user, project_id: project_id };
    });

    const bulkInsert = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Link)
      .values(updatedLinks)
      .execute();

    const project = await Project.findOne({ project_id});
    if (project){
      const projectLinks = await Link.find({
        where: { project_id: project_id },
        order: { position: 'ASC' },
      });
      project.links = projectLinks ? projectLinks: [];
    }


    return res.status(200).json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
