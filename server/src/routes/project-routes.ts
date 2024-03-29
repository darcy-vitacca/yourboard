import { Application } from 'express';
import * as projectController from '../components/projects/controller';
import user from '../components/middleware/user';
import auth from '../components/middleware/auth';

module.exports = (app: Application): void => {
  app.route('/api/project/:name').get(user, auth, projectController.getProject);
  app.route('/api/projects').get(user, auth, projectController.getProjects);
  app.route('/api/project').post(user, auth, projectController.createProject);
  app
    .route('/api/project/invite')
    .post(user, auth, projectController.inviteUserToProject);
  app
    .route('/api/notes/:projectId')
    .get(user, auth, projectController.getNotes);
  app
    .route('/api/notes/:projectId')
    .post(user, auth, projectController.updateNotes);
  app
    .route('/api/project/:projectId')
    .delete(user, auth, projectController.deleteProject);
  app
    .route('/api/project/:projectId')
    .patch(user, auth, projectController.updateProject);
};
