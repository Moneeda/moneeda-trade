import { inject, provide, ref } from "vue";

// import api from "@/api";

const key = Symbol.for("strategies");

const createStrategiesInstance = () => {
  const strategies = ref([]);
  const activeStrategy = ref(null);
  const changeStrategy = (strategy) => {
    activeStrategy.value = strategy;
  };

  return {
    strategies,
    activeStrategy,
    changeStrategy,
  };
};

export function provideStrategies() {
  const instance = createStrategiesInstance();
  provide(key, instance);
  return instance;
}

export function useStrategies() {
  return inject(key);
}
