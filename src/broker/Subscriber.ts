import axios from 'axios';
import debug, { Debugger } from 'debug';
class Subscriber {
  private url: string;
  private topics: Array<string> = [];
  private online: boolean = false;
  private createdAt: Date;
  private log: Debugger;

  constructor(url: string) {
    this.url = url;
    this.createdAt = new Date();
    this.checkAvilability();
    this.log = debug(`Pangaea:[${url}]`);
  }

  // when subsriber server is up and running
  get isOnline() {
    return this.online;
  }

  getUrl() {
    return this.url;
  }

  checkAvilability() {
    setInterval(async () => {
      console.log('timer');
      try {
        await axios.get(`${this.url}/health`);
        this.online = true;
        this.log('service is online');
      } catch (error) {
        this.online = false;
        this.log('service is offline');
      }
    }, 10000);
  }

  hasTopic(topic: string) {
    return this.topics.includes(topic);
  }

  registerTopic(topic: string) {
    // do not do anything of a topic already exists
    if (!this.topics.includes(topic)) {
      this.topics.push(topic);
    }
  }
}

export default Subscriber;
