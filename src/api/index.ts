import { Router } from 'express';
import hello from './routes/hello';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  hello(app);
  return app;
};
