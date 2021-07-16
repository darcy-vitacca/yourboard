import { Application } from 'express'
import * as userController from '../../src/components/user/controller'

export const userRoutes = (app: Application): void => {
  app.route('/')
    .get(userController.getUser)
}
