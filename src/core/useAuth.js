import createAuth0Client from "@auth0/auth0-spa-js";
import { inject, provide, ref } from "vue";
import api from "~/api";
import storage from "~/services/storage";
import router from "../router";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
const callbackUrl = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;

const Auth0Symbol = Symbol();

const createAuth0Instance = () => {
  const auth0Client = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(true);
  const user = ref(null);
  const error = ref(null);

  const createClient = async () => {
    auth0Client.value = await createAuth0Client({
      domain,
      client_id: clientId,
      redirect_uri: callbackUrl,
    });
  };

  const handleCallback = async () => {
    if (!auth0Client.value) {
      await createClient();
    }

    isAuthenticated.value = await auth0Client.value.isAuthenticated();
    if (isAuthenticated.value) {
      user.value = (await auth0Client.value.getUser()) || null;
      isLoading.value = false;

      window.history.replaceState({}, document.title, window.location.pathname);

      return;
    }

    const params = new URLSearchParams(window.location.search);
    const hasError = params.has("error");
    const hasCode = params.has("code");
    const hasState = params.has("state");

    if (hasError) {
      error.value = new Error(
        params.get("error_description") || "error completing login process"
      );

      isLoading.value = false;

      return;
    }

    if (hasCode && hasState) {
      try {
        const result = await auth0Client.value.handleRedirectCallback();

        let url = "/app/strategies";

        if (result.appState && result.appState.targetUrl) {
          url = result.appState.targetUrl;
        }

        isAuthenticated.value = await auth0Client.value.isAuthenticated();

        if (isAuthenticated.value) {
          user.value = (await auth0Client.value.getUser()) || null;
          error.value = null;

          isLoading.value = false;

          const { jwt } = await api.users().validate(user.value);
          api.setJwt(jwt);

          await router.push(url);

          return;
        }
      } catch (err) {
        error.value = err;
      }
    }

    isLoading.value = false;
  };

  const login = async () => {
    if (!auth0Client.value) {
      return;
    }
    try {
      const currentLanguage = storage.get("lng");
      await auth0Client.value.loginWithRedirect({
        ui_locales: currentLanguage || "en",
      });
    } catch (err) {
      error.value = err;
    }
  };

  const logout = async (options) => {
    if (!auth0Client.value) {
      return;
    }

    try {
      auth0Client.value.logout({
        ...options,
        returnTo: import.meta.env.VITE_APP_DOMAIN,
      });
    } catch (err) {
      error.value = err;
    }
  };

  const getAccessToken = async (options) => {
    if (!auth0Client.value) {
      return null;
    }

    return await auth0Client.value.getTokenSilently(options);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    createClient,
    handleCallback,
    login,
    logout,
    getAccessToken,
  };
};

export const provideAuth0 = () => {
  const auth0 = createAuth0Instance();
  provide(Auth0Symbol, auth0);

  return auth0;
};

export const useAuth0 = () => {
  const auth0 = inject(Auth0Symbol);

  if (!auth0) {
    return null;
  }

  return auth0;
};
