
import Https from '../scripts/utils/Https.js';
export default class BrothService {
    constructor() {
        this.https = new Https();
        this.path = 'orders'
    }

    async postOrders(brothId, proteinId) {
      const order = await this.https.post(this.path, {brothId, proteinId});
      return  order;
    }
}