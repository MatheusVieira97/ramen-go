import Https from '../scripts/utils/Https.js';
export default class ProteinService {
  constructor() {
    this.https = new Https();
    this.path = 'proteins'
  }

  async getProteins() {
    const fakeProteins = this.fakeProteins();
    const proteins = await this.https.get(this.path)
    return  proteins || fakeProteins
  }

  //Created this fake proteins just because sometimes during development the third-party API was offline. 
  //So I use this  just in case API is not online during the tests.
  fakeProteins() {
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