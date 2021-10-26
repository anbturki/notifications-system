import subscriberController from './subscriber.controller';
import Application from '../Application';
import { NextFunction, Request, Response } from 'express';
export class Subscriber extends Application {
  protected SERVICE_NAME = 'Subscriber';
  protected PORT: number = parseInt(process.env.SUBSCRIBER_PORT as any, 10) || 9000;

  constructor(options: any = {}) {
    super();
    const { name, port } = options;
    this.PORT = port || this.PORT;
    this.SERVICE_NAME = name || this.SERVICE_NAME;
  }

  setupEndpoints() {
    this.app.post('/', subscriberController.listen);
    this.app.get('/health', subscriberController.health);
  }
}
