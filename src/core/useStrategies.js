import { inject, provide, ref } from "vue";
import api from "~/api";
const key = Symbol.for("strategies");

function generateIconId(str) {
  var sum = 0;
  var numbers = str.match(/\d+/g).map(Number);
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const createStrategiesInstance = () => {
  const strategies = ref([]);
  const conditions = ref([]);

  const activeStrategy = ref(null);
  const changeStrategy = (strategy) => {
    activeStrategy.value = strategy;
    fetchConditions(strategy._id);
  };

  const fetchConditions = async (strategyId) => {
    const conds = await api.conditions().forStrategy(strategyId);
    conditions.value = conds;
  };

  const retrieveStrategies = async (defaultToFirst = true) => {
    const strats = await api.strategies().all();
    strategies.value = strats.map((strat) => ({
      ...strat,
      label: strat.name,
      numId: generateIconId(strat._id),
    }));
    if (defaultToFirst && strats.length > 0) {
      changeStrategy(strats[0]);
    }
  };

  retrieveStrategies();

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
