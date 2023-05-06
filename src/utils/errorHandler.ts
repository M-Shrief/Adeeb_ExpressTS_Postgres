import HttpStatusCode from './httpStatusCode';

// process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
//   throw reason;
// });

// process.on('uncaughtException', (error: Error) => {
//   handleErrors(error);
//   if (!errorManagement.handler.isTrustedError(error)) process.exit(1);
// });

export type AppErrorArgs = {
  name?: string;
  httpCode: HttpStatusCode;
  description: string;
  isOperational: boolean;
};

// centralized error object that derives from Node’s Error
export class AppError extends Error {
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly description: string;

  constructor(args: AppErrorArgs) {
    super(args.description);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode;
    this.description = args.description;
    this.isOperational = args.isOperational || false;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    Error.captureStackTrace(this);
  }
}
