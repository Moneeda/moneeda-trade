export default class IntegrationsApi {
  constructor(client) {
    this.client = client
  }

  async forApp(appId) {
    const { data } = await this.client.get(`/ints/${appId}`)
    return data
  }

  async remove(integrationId) {
    const { data } = await this.client.delete(`/ints/${integrationId}`)
    return data
  }

  async refresh(integrationId) {
    const { data } = await this.client.put(`/ints/${integrationId}/refresh`)
    return data
  }

  async stripe(integration) {
    const { data } = await this.client.post(`/ints/stripe`, integration)
    return data
  }

  async ethereum(integration) {
    const { data } = await this.client.post(`/ints/ethereum`, integration)
    return data
  }

  async stripeOauth() {
    const { data } = await this.client.post(`/ints/stripe/oauth`)
    return data
  }

  async squareOauth(code) {
    const { data } = await this.client.post(`/ints/square/oauth`, { code })
    return data
  }

  async mollieOauth(code) {
    const { data } = await this.client.post(`/ints/mollie/oauth`, { code })
    return data
  }

  async squarePayment(body) {
    const { data } = await this.client.post(`/ints/square/payment`, body)
    return data
  }

  async checkStripeAccountStatus(accountId) {
    const { data } = await this.client.get(`/ints/stripe/oauth/${accountId}`)
    return data
  }
}
