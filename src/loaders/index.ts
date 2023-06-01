import { Application } from 'express';
import expressLoader from './express';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
