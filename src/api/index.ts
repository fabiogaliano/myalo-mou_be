import { Router } from 'express';
import users from './routes/users';
import images from './routes/images';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  users(app);
  images(app)
  return app;
};
