export default class SimulationsApi {
  constructor(client) {
    this.client = client;
  }

  async all() {
    const { data } = await this.client.get("simulation-tests/list");
    return data;
  }
}
