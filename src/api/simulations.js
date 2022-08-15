export default class SimulationsApi {
  constructor(client, labClient) {
    this.client = client;
    this.labClient = labClient;
  }

  async all() {
    const { data } = await this.client.get("simulation-tests/list");
    return data;
  }

  async simulate(simulate) {
    const { data } = await this.labClient.post("simulation", simulate);
    return data;
  }
}
