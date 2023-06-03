import { Application } from 'express';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: { expressApp: Application }) => {
  //await mongooseLoader();
  mongooseLoader();
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
