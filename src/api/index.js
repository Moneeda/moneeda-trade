import axios from "axios";
import SimulationsApi from "./simulations";
import StrategiesApi from "./strategies";
import ConditionsApi from "./conditions";
import ActionsApi from "./actions";
import UsersApi from "./users";
import storage from "~/services/storage";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "",
    });
    this.internalClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/`,
    });
    this.internalLabClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_LAB_API_URL}/`,
    });
    const token = storage.get("jwt");
    this.setJwt(token);
    this.setUser();
  }

  simulations() {
    return new SimulationsApi(this.internalClient, this.internalLabClient);
  }

  strategies() {
    return new StrategiesApi(this.internalClient);
  }

  conditions() {
    return new ConditionsApi(this.internalClient);
  }

  actions() {
    return new ActionsApi(this.internalClient);
  }

  users() {
    return new UsersApi(this.internalClient);
  }

  setJwt(jwt) {
    this.internalClient.defaults.headers.common = {
      ...this.internalClient.defaults.headers.common,
      Authorization: `Bearer ${jwt}`,
    };
    this.internalLabClient.defaults.headers.common = {
      ...this.internalLabClient.defaults.headers.common,
      Authorization: `Bearer ${jwt}`,
    };
    storage.set("jwt", jwt);
  }

  setUser() {
    const user = storage.get("jwt") !== 'null' ? storage.set("user", true) : storage.set("user", false);
    return user;
  }

  logout() {
    storage.remove("jwt");
    storage.remove("user");
    this.internalClient.defaults.headers.common = {};
    this.internalLabClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
