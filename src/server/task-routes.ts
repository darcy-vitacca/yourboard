import { Application } from 'express'
import * as taskController from '../../src/components/task/controller'

export const taskRoutes = (app: Application): void => {
  app.route('/')
    .get(taskController.getTask)
}
