export default class UsersApi {
  constructor(client) {
    this.client = client;
  }

  async validate(user) {
    const { data } = await this.client.post("users/validate", user);
    return data;
  }
}
