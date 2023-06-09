import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(<string>process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: <string>process.env.MONGODB_URI,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  /**
   *  Azure
   */
  azureEndpoint: process.env.AZURE_ENDPOINT || '',
  azureSubscriptionKey: process.env.AZURE_SUBSCRIPTION_KEY || '',
};
