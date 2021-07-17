import { Application } from 'express'
import * as projectController from '../../src/components/projects/controller'

export const projectRoutes = (app: Application): void => {
  app.route('/')
    .get(projectController.getProject)
}
