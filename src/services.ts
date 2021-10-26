import broker from './broker/broker';
import { Subscriber } from './subscriber';

const bootstrap = async () => {
  await broker.run();
  new Subscriber({ name: 'Subscriber_1' }).run(9000);
  new Subscriber({ name: 'Subscriber_2' }).run(9001);
};

bootstrap();
