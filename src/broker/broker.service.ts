import Subscriber from './Subscriber';
import axios, { AxiosResponse } from 'axios';
import { Response } from 'express';

interface IResponse {
  sent: boolean;
  payload: any;
  topic: string;
  url: string;
}

class BrokerService {
  private subscribers: Array<Subscriber> = [];

  findOrCreateSubscriber(url: string): Subscriber {
    // get subscriber
    let subscriber = this.subscribers.find((sub: Subscriber) => sub.getUrl() === url) as Subscriber;
    // create a new subscriber if there is no one with the url
    if (!subscriber) {
      subscriber = new Subscriber(url);
      this.subscribers.push(subscriber);
    }
    return subscriber;
  }

  // fetch one subscriber by topic
  fetchOneSubscriberByTopic() {}
  // fetch one subscriber by url
  fetchOneSubscriber() {}

  fetchSubscribers(): Subscriber[] {
    return this.subscribers;
  }

  getUrlsByTopic(topic: string): string[] {
    return this.subscribers.filter((sub: Subscriber) => sub.hasTopic(topic)).map((sub: Subscriber) => sub.getUrl());
  }

  async publishMessage(topic: string, payload: any) {
    const urls = this.getUrlsByTopic(topic);
    // iterate over urls, reslove with eaither to return sent true or false
    const requests = urls.map((url: string) => {
      return new Promise(async (reslove: (response: IResponse) => void) => {
        let sent = false;
        try {
          await axios.post(url, { topic, data: payload });
          sent = true;
        } catch (error) {
        } finally {
          reslove({ sent, payload, topic, url });
        }
      });
    });
    const results = await Promise.all<IResponse>(requests);
    // number of sent requests
    const successCount = results.filter((res: IResponse) => res.sent).length;
    return {
      message: `Sent to ${successCount} out of ${results.length} subscribers.`,
      details: results,
    };
  }
}

export default new BrokerService();
