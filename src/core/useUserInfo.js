import { inject, provide, ref } from "vue";
import api from "~/api";

const key = Symbol.for("UserInfo");

const createInstance = () => {
  const userInfo = ref(null);

  const setUserInfo = async () => {
    userInfo.value = await api.users().getUserInfo();
  };

  return {
    userInfo,
    setUserInfo,
  };
};

export function provideUserInfo() {
  const instance = createInstance();
  provide(key, instance);
  return instance;
}

export function useUserInfo() {
  return inject(key);
}
