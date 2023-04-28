import { NextFunction, Request, Response } from 'express';
import ExampleService from '../services/example.service';

export default class ExampleController {
  private exampleService: ExampleService = new ExampleService();

  public getHello = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(this.exampleService.sayHello('User'));
  };
}
