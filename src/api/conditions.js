export default class ConditionsApi {
  constructor(client) {
    this.client = client;
  }

  async forStrategy(strategyId) {
    const { data } = await this.client.get(`conditions/list/${strategyId}`);
    return data;
  }

  async resources() {
    const { data } = await this.client.get(`resources/condition-form`);
    return data;
  }

  async remove(id) {
    const { data } = await this.client.delete(`conditions/${id}`);
    return data;
  }

  async add(condition) {
    const { data } = await this.client.post(`conditions`, condition);
    return data;
  }

  async update(condition) {
    const { data } = await this.client.put(`conditions`, condition);
    return data;
  }
}
