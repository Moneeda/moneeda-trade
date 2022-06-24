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
    // TODO: set jwt in axios from local storage
    const token = localStorage.getItem('jwt');
    this.internalClient.defaults.headers.head = axios.create({
        Authorization: `Bearer ${token}`,
    })
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
    // TODO: add jwt to local storage
    window.localStorage.setItem('jwt', jwt);
  }

  logout() {
    window.localStorage.removeItem('jwt');
    this.internalClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
