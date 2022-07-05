export default class StrategiesApi {
  constructor(client) {
    this.client = client;
  }

  async all() {
    const { data } = await this.client.get("strategies/list");
    return data;
  }

  async add(body) {
    const { data } = await this.client.post(`strategies`, body);
    return data;
  }

  async remove(strategy) {
    const { data } = await this.client.delete(`strategies/${strategy._id}`);
    return data;
  }

  async update(body) {
    const { data } = await this.client.post(`strategies/${body._id}`, body);
    return data;
  }
}
