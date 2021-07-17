import { Application } from 'express';
import * as projectController from '../../src/components/projects/controller';

module.exports = (app: Application): void => {
  app.route('/api/').get(projectController.getProject);
};
