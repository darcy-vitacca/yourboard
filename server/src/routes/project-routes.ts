import { Application } from 'express';
import * as projectController from '../components/projects/controller';
import user from '../components/middleware/user';
import auth from '../components/middleware/auth';

module.exports = (app: Application): void => {
  app.route('/api/project/:name').get(user, auth, projectController.getProject);
  app.route('/api/projects').get(user, auth, projectController.getProjects);
  app.route('/api/project').post(user, auth, projectController.createProject);
};
