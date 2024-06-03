import Https from '../scripts/utils/Https.js';
export default class ProteinService {
  constructor() {
    this.https = new Https();
    this.path = 'proteins'
  }

  async getProteins() {
    const proteins = await this.https.get(this.path);
    return  proteins;
  }
}