import brokerController from './broker.controller';
import Application from '..//Application';

/**
 * Publisher
 * in which can forward messages to subscribers
 */
class Broker extends Application {
  protected SERVICE_NAME = 'Broker';
  protected PORT: number = parseInt(process.env.BROKER_PORT as any, 10) || 8000;

  constructor() {
    super();
  }

  setupEndpoints() {
    this.app.post('/subscribe/:topic', brokerController.subscribe.bind(brokerController));
    this.app.post('/publish/:topic', brokerController.publish.bind(brokerController));
  }
}

export default new Broker();
