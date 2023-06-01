import { Request, Response, NextFunction, Application, json } from 'express';
import cors from 'cors';
import routes from '@/api';
import config from '@/config';
import { CustomError } from '@/utils/errors';

export default ({ app }: { app: Application }) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(json());
  // Formats sent json
  app.set('json spaces', 2);

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new CustomError('Not found', 404);
    next(err);
  });

  /// error handlers
  app.use(
    (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
      /**
       * Handle 401 thrown by express-jwt library
       */
      if (err.name === 'UnauthorizedError') {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );
  app.use(
    (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
      err;
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
