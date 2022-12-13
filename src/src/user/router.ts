import { Router } from 'express';
import userController from './controller';
import { GlobalMiddleWare } from '../../middlewares/GlobalMiddleWares';
class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoutes();
  }

  postRoutes() {
    this.router.post('/register', userController.register);
    this.router.post('/login', userController.login);
  }
}
export default new UserRouter().router;
