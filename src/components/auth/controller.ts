import { Request, Response } from 'express';

export const getAuth = async (req: Request, res: Response) => {
  try {
    return req;
  } catch (err) {
    console.log(err);
  }
};
