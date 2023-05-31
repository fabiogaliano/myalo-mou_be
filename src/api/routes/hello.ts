import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/hello', route);

  route.get('/me', (req: Request, res: Response) => {
    return res.json({ world: 'hello' }).status(200);
  });
};
