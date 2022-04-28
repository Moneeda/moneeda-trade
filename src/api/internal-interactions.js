export default class InternalIntsApi {
  constructor(client) {
    this.client = client
  }

  async all() {
    try {
      const { data } = await this.client.get('i/payments')
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }
}
