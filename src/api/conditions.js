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

  async remove(strategyId, id) {
    const { data } = await this.client.delete(`conditions/${strategyId}/${id}`);
    return data;
  }

  async add(condition) {
    const { data } = await this.client.post(`conditions`, condition);
    return data;
  }

  async duplicate(targetId, sourceId, timestamp) {
    const { data } = await this.client.post(`conditions/duplicate`, {
      targetId,
      sourceId,
      timestamp,
    });
    return data;
  }

  async update(condition) {
    const { data } = await this.client.put(`conditions`, condition);
    return data;
  }
}
