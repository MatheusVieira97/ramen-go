import Https from '../scripts/utils/Https.js';
export default class BrothService {
  constructor() {
    this.https = new Https();
    this.path = 'broths'
  }

  async getBroths() {
    const broths = await this.https.get(this.path);
    return broths;
  }
}