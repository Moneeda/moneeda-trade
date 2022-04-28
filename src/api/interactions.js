export default class InteractionsApi {
  constructor(client) {
    this.client = client
  }

  async track(interactionId, body) {
    const { data } = await this.client.post(`/i/${interactionId}/track`, body)
    return data
  }
}
