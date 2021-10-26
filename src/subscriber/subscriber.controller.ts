import { Request, Response } from 'express';

class SubscriberController {
  listen(request: Request, response: Response) {
    const body = request.body;
    response.json(body);
  }
  // health check
  health(_: Request, response: Response) {
    response.json({
      online: true,
      date: new Date(),
    });
  }
}

export default new SubscriberController();
