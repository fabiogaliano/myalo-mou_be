import { imageClassierInstance } from '@/helpers/image-classification';
import createImageInteractor from '@/interactors/createImageInteractor';
import { Router, Request, Response } from 'express';
import createImagePersistence from '@/persistence/createImagePersistence';

const route = Router();

export default (app: Router) => {
  app.use('/images', route);

  route.get('/', async (req: Request, res: Response) => {
    res.send({a: 'works'})
  });

  route.post('/',async (req: Request, res: Response) => {
    const { url } = <{ url: string }>req.body;
    const colors = await imageClassierInstance.getColorsFromImage(url);
    const tags = await imageClassierInstance.classifyImage(url)
    const filteredTags: string[] = tags.filter((tag): tag is string => tag !== undefined);

    const image = await createImageInteractor({ createImagePersistence }, { url: url, data: { colors, tags: filteredTags, title: 'horizon' } })
    
    return res.json({ filteredTags, colors, image }).status(200);
  })
};
