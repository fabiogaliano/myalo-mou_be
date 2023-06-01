import { imageClassierInstance } from '@/utils/image-classification';
import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/image', route);

  route.get('/colors', async (req: Request, res: Response) => {
    const imageUrl = 'https://i.imgur.com/R4E3VA9.jpeg';
    const result = await imageClassierInstance.getColorsFromImage(imageUrl);
    return res.json({ result }).status(200);
  });
};
