import { inject, provide, ref, reactive } from "vue";
import api from "~/api";
import {
  createRawNode,
  NodeType,
} from "~/components/strategies/strategyFlowHelper";
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
  const autosave = ref(true);
  const loading = reactive({
    create: false,
    remove: false,
  });

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
    loading.create = true;
    const strategy = await api.strategies().add(strategyData);
    strategies.value.push(strategy);
    loading.create = false;
    return strategy;
  };

  const removeStrategy = async (strategy) => {
    loading.remove = true;
    await api.strategies().remove(strategy);
    const strategyIndex = strategies.value.findIndex(
      (s) => s._id === strategy._id
    );
    strategies.value.splice(strategyIndex, 1);
    loading.remove = false;
  };

  retrieveStrategies();

  const addNode = (type) => {
    const node = createRawNode();
    if (type === NodeType.CONDITION) {
      conditions.value.push(node);
    } else if (type === NodeType.ACTION) {
      actions.value.push(node);
    }
  };

  const updateNode = (node) => {
    console.log(node);
    // TODO map and ping endpoint
  };

  return {
    autosave,
    loading,
    conditions,
    actions,
    strategies,
    activeStrategy,
    changeStrategy,
    createStrategy,
    removeStrategy,
    addNode,
    updateNode,
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
