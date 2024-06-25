import express, { Application, Request, Response, Router } from 'express';
// Config
import { PORT, CORS_ORIGIN, SENTRY_DNS } from './config';
// Middlewares
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
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
  AppError
} from './utils/errors';

/**
 * App class, contains App properties and methods
 */
export default class App {
  private app: Application;
  private port: string | number;

  /**
   * @param {Router[]} routes - An array of Express router instance for every component.
   */
  constructor(routes: Router[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.initializeSentry(this.app);
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  /**
   * Used to initialize the app, listening on {@link App.port}
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(
        `⚡️[server]: Server is running @ http://localhost:${this.port}`,
      );
    });
  }

  /**
   * Used to initialize App's middlewares
   */
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

  /**
   * Used to initialize App's routes
   *
   * @param {Router[]} routes - express.router instance for every component routes.
   */
  private async initializeRoutes(routes: Router[]) {
    // Importing commonjs dynamically, and using {*:*func} because it's a default export
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
    routes.forEach((router) => {
      this.app.use('/api', apiLimiter, router);
    });
  }

  /**
   * Used to initialize Sentry Logging & Monitoring.
   *
   * @param {Application} app - Express App.
   */
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
    logger.info('Connected to Sentry');
  }

  /**
   * Used to Initialize App's error handling mechanisms.
   */
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
