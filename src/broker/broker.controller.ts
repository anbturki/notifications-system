import { Request, Response } from 'express';
import brokerService from './broker.service';

interface PublishBody {
  url: string;
}

class BrokerController {
  subscribe(request: Request, response: Response) {
    const { topic } = request.params;
    const { url }: PublishBody = request.body;
    const subscriber = brokerService.findOrCreateSubscriber(url);
    subscriber.registerTopic(topic);
    response.send({ url, topic });
  }

  async publish(request: Request, response: Response) {
    const { topic } = request.params;
    const payload: any = request.body;
    const result = await brokerService.publishMessage(topic, payload);
    response.json(result);
  }
}

export default new BrokerController();
