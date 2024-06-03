import Https from '../scripts/utils/Https.js';
export default class BrothService {
  constructor() {
    this.https = new Https();
    this.path = 'broths'
  }

  async getBroths() {
    const fakeBroths = this.fakeBroths();
    const broths = await this.https.get(this.path);
    return broths || fakeBroths
  }

  //Created this fake broths just because sometimes during development the third-party API was offline. 
  //So I use this just in case API is not online during the tests.
  fakeBroths() {
    return [
      {
        'id': 1,
        'imageActive': '',
        'imageInactive': '',
        'name': 'Chasu',
        'description': 'A sliced flavourful pork meat with a selection of season vegetables.',
        'price': 'US$ 10',
      },
      {
        'id': 2,
        'imageActive': '',
        'imageInactive': '',
        'name': 'Chasu',
        'description': 'A sliced flavourful pork meat with a selection of season vegetables.',
        'price': 'US$ 10',
      },
    ]
  }
}