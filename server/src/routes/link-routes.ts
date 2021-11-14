import { Application } from 'express';
import * as linkController from '../components/link/controller';
import user from '../components/middleware/user';
import auth from '../components/middleware/auth';

module.exports = (app: Application): void => {
  app
    .route('/api/link/:project_id')
    .post(user, auth, linkController.createLink);
  app
    .route('/api/link/:link_id/:project_id')
    .delete(user, auth, linkController.deleteLink);
  app
    .route('/api/link/:project_id')
    .patch(user, auth, linkController.updateLink);
};
