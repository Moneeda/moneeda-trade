export default class InternalAppsApi {
  constructor(client) {
    this.client = client
  }

  async all() {
    try {
      const { data } = await this.client.get('apps')
      return data
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async create(app) {
    const { data } = await this.client.post('apps', app)
    return data
  }

  async remove(appId) {
    const { data } = await this.client.delete(`apps/${appId}`)
    return data
  }
}
