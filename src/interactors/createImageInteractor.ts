import { CreateIImage } from '@/persistence/models/content.models/image.model';

import createImagePersistence from '@/persistence/createImagePersistence';

type ICreateImagePersistence = {
  createImagePersistence: typeof createImagePersistence;
};

export default async (
  {
    createImagePersistence,
  }: ICreateImagePersistence,
  { url, data }: CreateIImage
) => await createImagePersistence({ url, data });
