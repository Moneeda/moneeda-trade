import axios from "axios";
import IntegrationsApi from "./integrations";
import InteractionsApi from "./interactions";
import InternalApi from "./internal";
import InternalAppsApi from "./internal-applications";
import InternalInteractionsApi from "./internal-interactions";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "",
    });
    this.internalClient = axios.create({
      baseURL: `${import.meta.VITE_APP_API_URL}/api`,
    });
  }

  internal() {
    return new InternalApi(this.internalClient);
  }

  internalApps() {
    return new InternalAppsApi(this.internalClient);
  }

  internalInteractions() {
    return new InternalInteractionsApi(this.internalClient);
  }

  integrations() {
    return new IntegrationsApi(this.internalClient);
  }

  interactions() {
    return new InteractionsApi(this.internalClient);
  }

  setJwt(jwt) {
    this.internalClient.defaults.headers.common = {
      ...this.internalClient.defaults.headers.common,
      Authorization: `Bearer ${jwt}`,
    };
  }

  setActiveApp(appId) {
    this.internalClient.defaults.headers.common = {
      ...this.internalClient.defaults.headers.common,
      "moneeda-appid": appId,
    };
  }

  logout() {
    this.internalClient.defaults.headers.common = {};
  }
}

export default new ApiClient();
