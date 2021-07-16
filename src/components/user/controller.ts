import { Request, Response } from 'express'

export const getUser = async (req: Request, res : Response) => {
  try {
    return req
  } catch (err) {
    console.log(err);
  }
}
