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

    const project = await Project.findOne({ project_id });
    if (project) {
      const projectLinks = await Link.find({
        where: { project_id: project_id },
        order: { position: 'ASC' },
      });
      project.links = projectLinks ? projectLinks : [];
    }

    return res.status(200).json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  const link_id = req.params.link_id;
  const project_id = req.params.project_id;
  try {
    let errors: any = {};
    const link = await Link.findOne({
      where: { link_id: link_id },
    });
    if (!link) {
      return res.status(404).json({ link: 'Link not found' });
    }
    const deletedLink = await Link.delete({ link_id: link_id });

    const project = await Project.findOne({ project_id: project_id });
    if (project) {
      const projectLinks = await Link.find({
        where: { project_id: project_id },
        order: { position: 'ASC' },
      });
      project.links = projectLinks ? projectLinks : [];
    }

    return res.status(200).json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const updateLink = async (req: Request, res: Response) => {
  const project_id = req.params.project_id;
  const user: User = res.locals.user;
  try {
    let errors: any = {};

    const link = await Link.findOne({
      where: { link_id: req.body[0].link_id },
    });
    if (!link) {
      return res.status(404).json({ link: 'Link not found' });
    }
    link.url = req.body[0].url;
    link.url_image = req.body[0].url_image;
    link.url_name = req.body[0].url_name;

    await Link.save(link);

    const project = await Project.findOne({ project_id });
    if (project) {
      const projectLinks = await Link.find({
        where: { project_id: project_id },
        order: { position: 'ASC' },
      });
      project.links = projectLinks ? projectLinks : [];
    }

    return res.status(200).json(project);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
