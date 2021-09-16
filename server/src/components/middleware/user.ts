import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../entities/User';

//This returns a user if they exist and if they don't will throw an unauthenticated we split it up
//because we can have a user be logged in and functionality change or just have no user to perform
//functionality
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const { email }: any = await jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOne({ email });

    res.locals.user = user;

    return next();
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};
