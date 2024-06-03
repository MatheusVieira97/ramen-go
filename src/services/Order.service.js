
import Https from '../scripts/utils/Https.js';
export default class BrothService {
    constructor() {
        this.https = new Https();
        this.path = 'orders'
    }

    async postOrders(brothId, proteinId) {
      const fakeOrder = this.createFakeOrder();
      const order = await this.https.post(this.path, {brothId, proteinId})
      return  order || fakeOrder
    }

    //Created this fake order just because sometimes during development the third-party API was offline. 
    //So I use this  just in case API is not online during the tests.
    createFakeOrder() {
      return {
        id: 1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Miso-soup.svg',
        description: 'Shoyu and Karaague Ramen',
      }
    }
}