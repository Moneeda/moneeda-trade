import { inject, provide, ref } from "vue";

// import api from "@/api";

const key = Symbol.for("layout");

const createLayoutInstance = () => {
  const layoutMode = ref("view");

  const switchLayout = (mode) => {
    layoutMode.value = mode;
  };

  return {
    layoutMode,
    switchLayout,
  };
};

export function provideLayout() {
  const instance = createLayoutInstance();
  provide(key, instance);
  return instance;
}

export function useLayout() {
  return inject(key);
}
