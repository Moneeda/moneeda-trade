export default class ActionsApi {
  constructor(client) {
    this.client = client;
  }

  async forStrategy(strategyId) {
    const { data } = await this.client.get(`actions/list/${strategyId}`);
    return data;
  }

  async resources() {
    const { data } = await this.client.get(`resources/action-form`);
    return data;
  }

  async remove(strategyId, id) {
    const { data } = await this.client.delete(`actions/${strategyId}/${id}`);
    return data;
  }

  async add(action) {
    const { data } = await this.client.post(`actions`, action);
    return data;
  }

  async update(action) {
    const { data } = await this.client.put(`actions`, action);
    return data;
  }
}
