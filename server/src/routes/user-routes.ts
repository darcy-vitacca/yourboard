import { Application } from 'express';
import * as userController from '../components/user/controller';
import user from '../components/middleware/user';
import auth from '../components/middleware/auth';

module.exports = (app: Application): void => {
  app.route('/api/user/friends').get(user, auth, userController.getFriends);
};
