import { Application, Router } from 'express';
import * as userController from '../../src/components/user/controller';

export const authRoutes = (app: Application): void => {
  app.route('/register').post(userController.register);
  // app.route('/login').post(userController.register);
  // app.route('/me').get(userController.register);
  // app.route('/logout').get(userController.register);
};
