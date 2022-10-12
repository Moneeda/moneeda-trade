export default class UsersApi {
  constructor(client) {
    this.client = client;
  }

  async validate(user) {
    const { data } = await this.client.post("users/validate", user);
    return data;
  }

  async getConnectionCode(provider) {
    const { data } = await this.client.get(
      `users/connection-code?provider=${provider}`
    );
    return data;
  }

  async getUserInfo() {
    const { data } = await this.client.get(`users`);
    return data;
  }
}
