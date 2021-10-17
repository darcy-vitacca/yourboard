import { Request, Response } from 'express';
import User from '../../entities/User';
import Friends from '../../entities/Friends';
import isEmpty from 'lodash/isEmpty'

export const getFriends = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
    const usersFriends = await Friends.find({
      select: ['user_2_name', 'user_2_email'],
      where: { user_1_id: user.user_id },
    });

    if (isEmpty(usersFriends)) {
      return res.status(404).json({ user: 'Friends not found' });
    }

    return res.json(usersFriends);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(err);
  }
};
