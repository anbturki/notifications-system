import express, { Express, NextFunction, Request, Response } from 'express';
import debug, { Debugger } from 'debug';
import * as bodyParser from 'body-parser';
import cors from 'cors';

class Application {
  protected log!: Debugger;
  protected app: Express = express();
  protected SERVICE_NAME!: string;
  protected PORT!: number;

  constructor() {
    this.setupMiddlewares();
    this.app.use(this.loggingMiddleware.bind(this));
    this.setupEndpoints();
  }

  setupMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  loggingMiddleware(request: Request, _: Response, next: NextFunction) {
    const { body, url, method } = request;
    this.log(JSON.stringify({ method, url, payload: body }, null, 2));
    next();
  }

  setupEndpoints(): void {}

  run(port?: number) {
    const PORT = port || this.PORT;
    this.log = debug(`Pangaea:[${this.SERVICE_NAME}]`);
    return new Promise((reslove) => {
      this.app.listen(PORT, () => {
        this.log(`[run]: ${this.SERVICE_NAME} up and running on http://localhost:${PORT}`);
        reslove(this.app);
      });
    });
  }
}

export default Application;
