import { Application } from 'express';
import * as linkController from '../components/link/controller';

export const linkRoutes = (app: Application): void => {
  app.route('/').get(linkController.getLink);
};
