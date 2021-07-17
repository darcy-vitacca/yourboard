import { Application } from 'express';
import * as userController from '../../src/components/user/controller';

module.exports = (app: Application): void => {
  app.route('/').get(userController.register);
};
