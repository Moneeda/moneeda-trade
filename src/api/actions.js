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

  async remove(id) {
    const { data } = await this.client.delete(`actions/${id}`);
    return data;
  }

  async add(condition) {
    const { data } = await this.client.post(`actions`, condition);
    return data;
  }

  async update(condition) {
    const { data } = await this.client.put(`actions`, condition);
    return data;
  }
}
