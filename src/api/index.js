import axios from "axios";
import SimulationsApi from "./simulations";
import StrategiesApi from "./strategies";
import ConditionsApi from "./conditions";
import ActionsApi from "./actions";
import UsersApi from "./users";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "",
    });
    this.internalClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/`,
    });
    const token = localStorage.getItem("jwt");
    this.setJwt(token);
  }

  simulations() {
    return new SimulationsApi(this.internalClient);
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
    window.localStorage.setItem("jwt", jwt);
  }

  logout() {
    window.localStorage.removeItem("jwt");
    this.internalClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
