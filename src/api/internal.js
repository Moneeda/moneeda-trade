export default class InternalApi {
  constructor(client) {
    this.client = client
  }

  async user(user) {
    try {
      const { data } = await this.client.post(`users`, {
        user,
      })
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async usage() {
    const { data } = await this.client.get(`usage`)
    return data
  }

  async paymentRequest(body) {
    const { data } = await this.client.post(`pay`, body)
    return data
  }

  async paymentData(id) {
    // TODO handle errors
    try {
      const { data } = await this.client.get(`payment-data/${id}`)
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async subscribeLink(plan) {
    try {
      const { data } = await this.client.post(`subscribe/${plan}`)
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async plans() {
    try {
      const { data } = await this.client.get(`plans`)
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async test({ amount, currency, provider, itemName, itemImage }) {
    const { data } = await this.client.post(`pay`, {
      apiKey: 'SUPER_SECRET_API_KEY',
      provider,
      itemName: itemName || 'Amazing unique t-shirt',
      itemAmount: amount,
      itemCurrency: currency,
      itemImage: itemImage || 'https://i.imgur.com/DAyJ5f5.png',
    })
    return data
  }
}
