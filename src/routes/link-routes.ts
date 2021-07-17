import { Application } from 'express';
import * as linkController from '../components/link/controller';

module.exports = (app: Application): void => {
  app.route('/api/').get(linkController.getLink);
};
