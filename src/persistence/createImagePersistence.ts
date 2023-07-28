import imageModel from '@/persistence/models/content.models/image.model';

export default async ({ url, data }: any) => {
  try {
    const newImage = new imageModel({url, data})

    return await newImage.save();
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
