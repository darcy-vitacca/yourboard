import { Request, Response } from 'express';

export const getLink = async (req: Request, res: Response) => {
  try {
    return req;
  } catch (err) {
    console.log('here');
    console.log(err);
  }
};
