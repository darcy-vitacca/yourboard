import { Application } from 'express';
import * as projectController from '../../src/components/projects/controller';
import * as authController from '../components/auth/controller';
import user from '../components/middleware/user';
import auth from '../components/middleware/auth';

module.exports = (app: Application): void => {
  app.route('/api/projects/:name').get(projectController.getProject);
  app.route('/api/projects').post(user, auth, projectController.createProject);
};
