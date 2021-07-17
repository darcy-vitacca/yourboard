import { Application, Router } from 'express';
import * as authController from '../../src/components/auth/controller';
import auth from '../components/middleware/auth';
import user from '../components/middleware/user';

module.exports = (app: Application): void => {
  app.route('/api/auth/register').post(authController.register);
  app.route('/api/auth/login').post(authController.login);
  app.route('/api/auth/me').get(user, auth, authController.me);
  app.route('/api/auth/logout').get(user, auth, authController.logout);
};
