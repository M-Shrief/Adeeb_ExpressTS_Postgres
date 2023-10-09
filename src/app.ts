import express, { Application, Request, Response } from 'express';
// Config
import { PORT, CORS_ORIGIN, SENTRY_DNS } from './config';
// Middlewares
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { errorMiddleware } from './middlewares/errorHandler.middleware';
import { morganMiddleware } from './middlewares/morgan.middleware';
import rateLimit from 'express-rate-limit';
// Utils
import { logger } from './utils/logger';
import {
  isTrustedError,
  handleTrustedError,
} from './utils/errorsCenter/errorHandlers';
// interfaces
import { IRoute } from './interfaces/route.interface';
import { AppError } from './utils/errorsCenter/appError';

export default class App {
  public app: Application;
  public port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.initializeSentry(this.app);
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(
        `⚡️[server]: Server is running @ http://localhost:${this.port}`,
      );
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(Sentry.Handlers.requestHandler()); // must be the first middleware on the app
    this.app.use(Sentry.Handlers.tracingHandler()); // TracingHandler creates a trace for every incoming request
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(
      cors<Request>({
        origin: CORS_ORIGIN,
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),
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

  private initializeSentry(app: Application) {
    Sentry.init({
      dsn: SENTRY_DNS,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.4, // Capture 100% of the transactions, reduce in production!
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 0.4, // Capture 100% of the transactions, reduce in production!
    });
    logger.info("Connected to Sentry")
  }

  private initializeErrorHandling() {
    // if error is not operational/trusted/known we shall exit then use PM2 to restart.
    process.on('unhandledRejection', (reason: Error) => {
      throw reason;
    });

    process.on('uncaughtException', async (error: Error, res: Response) => {
      if (!isTrustedError(error)) process.exit(1);
      handleTrustedError(error as AppError, res);
    });

    this.app.use(Sentry.Handlers.errorHandler());
    this.app.use(errorMiddleware);
  }
}
