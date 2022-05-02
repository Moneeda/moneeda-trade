import axios from "axios";
import SimulationsApi from "./simulations";
import StrategiesApi from "./strategies";
import ConditionsApi from "./conditions";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "",
    });
    this.internalClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/`,
    });
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

  setJwt(jwt) {
    this.internalClient.defaults.headers.common = {
      ...this.internalClient.defaults.headers.common,
      Authorization: `Bearer ${jwt}`,
    };
  }

  logout() {
    this.internalClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
