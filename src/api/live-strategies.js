export default class LiveStrategiesApi {
  constructor(client) {
    this.client = client;
  }

  async getByStrategyId(strategyId) {
    const { data } = await this.client.get(`${strategyId}`);
    return data;
  }

  async ongoin() {
    const { data } = await this.client.get("ongoing");
    return data;
  }

  async create(strategyId) {
    const { data } = await this.client.post("create", { strategyId });
    return data;
  }

  async stop(liveStrategy) {
    const { data } = await this.client.delete(`strategies/${liveStrategy._id}`);
    return data;
  }

  async statusUpdate(id, status) {
    const { data } = await this.client.put("status/update", {
      _id: id,
      status: status,
    });
    return data;
  }
}
