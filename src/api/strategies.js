export default class StrategiesApi {
  constructor(client) {
    this.client = client;
  }

  async all() {
    const { data } = await this.client.get("strategies/list");
    return data;
  }

  async addStrategy(){
    const { data } = await this.client.post(`strategies`);
    return data;
  }
}
