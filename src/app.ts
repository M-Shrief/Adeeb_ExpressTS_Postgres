import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
// config
import { DB_NAME, DB_URL, PORT } from './config';
// Middlewares
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import errorMiddleware from './middlewares/error.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import rateLimit from 'express-rate-limit';
import setCache from './middlewares/cache.middleware';
// Utils
import { logger } from './utils/logger';
// interfaces
import { IRoute } from './interfaces/route.interface';

export default class App {
  public app: Application;
  public port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.initializeMiddlewares();
    this.connectToDB();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(
        `⚡️[server]: Server is running @ http://localhost:${this.port}`
      );
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(
      cors<Request>({
        origin: 'http://localhost:3000',
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );
    this.app.use(morganMiddleware);
  }

  private initializeRoutes(routes: IRoute[]): void {
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      message: async (req: Request, res: Response) => {
        res
          .status(429) // too many request
          .send('You can only make 1000 requests every 15 minutes.');
      },
    });

    // Apply the rate limiting middleware to API calls only
    routes.forEach((route) => {
      this.app.use('/api', apiLimiter, route.router);
    });
  }

  private connectToDB() {
    mongoose
      .connect(DB_URL as string, {
        dbName: DB_NAME,
        // other option are no longer required for v6+
      })
      .then(() => console.log('connected'))
      .catch((err) => logger.log(err));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
