import { inject, provide, ref } from "vue";
import api from "~/api";
const key = Symbol.for("strategies");

export const productOptions = [
  {
    label: "BTC/USDT",
    value: "BTC/USDT",
  },
  {
    label: "ADA/USDT",
    value: "ADA/USDT",
  },
  {
    label: "ETH/USDT",
    value: "ETH/USDT",
  },
  {
    label: "SOL/USDT",
    value: "SOL/USDT",
  },
  {
    label: "LINK/USDT",
    value: "LINK/USDT",
  },
];

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
  const actions = ref([]);

  const activeStrategy = ref(null);
  const changeStrategy = (strategy) => {
    activeStrategy.value = strategy;
    fetchConditionsAndActions(strategy._id);
  };

  const fetchConditionsAndActions = async (strategyId) => {
    const [conds, acts] = await Promise.all([
      api.conditions().forStrategy(strategyId),
      api.actions().forStrategy(strategyId),
    ]);
    conditions.value = conds;
    actions.value = acts;
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

  const createStrategy = async (strategyData) => {
    const strategy = await api.strategies().add(strategyData);
    strategies.value.push(strategy);
    return strategy;
  };

  retrieveStrategies();

  return {
    conditions,
    actions,
    strategies,
    activeStrategy,
    changeStrategy,
    createStrategy,
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
