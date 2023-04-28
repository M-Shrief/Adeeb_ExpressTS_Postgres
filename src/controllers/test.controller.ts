import { NextFunction, Request, Response } from 'express';
import TestService from '../services/test.service';

export default class TestController {
  public testServices: TestService = new TestService();

  public getHello = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(this.testServices.sayHello(req.body.name));
  };
}
