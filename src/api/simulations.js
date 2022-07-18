export default class SimulationsApi {
  constructor(client) {
    this.client = client;
  }

  async all() {
    const { data } = await this.client.get("simulation-tests/list");
    return data;
  }

  async simulate(simulate) {
    const { data } = await this.client.post("simulation", simulate);
    return data;
  }
}
