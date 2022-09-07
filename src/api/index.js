import axios from "axios";
import SimulationsApi from "./simulations";
import StrategiesApi from "./strategies";
import ConditionsApi from "./conditions";
import ActionsApi from "./actions";
import UsersApi from "./users";
import storage from "~/services/storage";
import router from "../router";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "",
    });
    this.internalClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/`,
    });
    this.internalClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          router.push({ path: "/" });
        }
        return Promise.reject(error);
      }
    );
    this.internalLabClient = axios.create({
      baseURL: `${import.meta.env.VITE_APP_LAB_API_URL}/`,
    });
    this.internalLabClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("error cathed");
        if (error.response.status === 401) {
          console.log("UNAUTHORIZED_ERROR");
        }
      }
    );
    const token = storage.get("jwt");
    this.setJwt(token);
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

  logout() {
    storage.remove("jwt");
    this.internalClient.defaults.headers.common = {};
    this.internalLabClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
