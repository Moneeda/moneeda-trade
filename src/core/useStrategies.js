import { inject, provide, ref, reactive, toRaw } from "vue";
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

const periodsOrderedBySize = ["1m", "5m", "15m", "30m", "1h", "4h", "1d"];

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
  const resources = ref({
    condition: {},
    action: {},
  });
  const actions = ref([]);
  const autosave = ref(true);
  const loading = reactive({
    create: false,
    remove: false,
  });

  const simulationResult = ref(null);

  const activeStrategy = ref(null);
  const activeLiveStrategy = ref(null);
  const conditionToUpdate = ref(null);
  const actionToUpdate = ref(null);
  const changeStrategy = (strategyId) => {
    activeStrategy.value = strategies.value.find((s) => s._id === strategyId);
    fetchConditionsAndActions(strategyId);
    fetchActiveLiveStrategy(strategyId);
  };

  const fetchConditionsAndActions = async (strategyId) => {
    const [conds, acts] = await Promise.all([
      api.conditions().forStrategy(strategyId),
      api.actions().forStrategy(strategyId),
    ]);
    conditions.value = conds;
    actions.value = acts;
  };

  const fetchActiveLiveStrategy = async (strategyId) => {
    const liveStrategy = await api.liveStrategies().getByStrategyId(strategyId);
    activeLiveStrategy.value = liveStrategy;
  };

  const createLiveStrategy = async (strategyId) => {
    const liveStrategy = await api.liveStrategies().create(strategyId);
    activeLiveStrategy.value = liveStrategy;
  };

  const switchActiveLiveStrategy = async () => {
    if (!activeLiveStrategy.value) {
      await createLiveStrategy(activeStrategy.value._id);
      return;
    }
    await updateActiveLiveStrategyStatus(
      activeLiveStrategy.value.status === "active" ? "paused" : "active"
    );
    await retrieveStrategies(false);
  };

  const updateActiveLiveStrategyStatus = async (status) => {
    const liveStrategy = await api
      .liveStrategies()
      .statusUpdate(activeLiveStrategy.value._id, status);
    activeLiveStrategy.value = liveStrategy;
  };

  const fetchResources = async () => {
    const [conds, acts] = await Promise.all([
      api.conditions().resources(),
      api.actions().resources(),
    ]);
    resources.value.condition = conds;
    resources.value.action = acts;
  };

  const getMinPeriodFromConditions = () => {
    const index = conditions.value.reduce((acc, condition) => {
      const index = periodsOrderedBySize.indexOf(condition.period);
      if (index < acc && index >= 0) {
        acc = index;
      }
      return acc;
    }, 1000);
    return periodsOrderedBySize[index];
  };

  const retrieveStrategies = async () => {
    const strats = await api.strategies().all();
    strategies.value = strats.map((strat) => ({
      ...strat,
      numId: generateIconId(strat._id),
    }));
    fetchResources();
  };

  const createStrategy = async (strategyData) => {
    loading.create = true;
    const strategy = await api.strategies().add(strategyData);
    strategies.value.push({ ...strategy, numId: generateIconId(strategy._id) });
    loading.create = false;
    return strategy;
  };

  const duplicateActions = async (targetId, sourceId, timestamp) => {
    await api.actions().duplicate(targetId, sourceId, timestamp);
  };

  const duplicateConditions = async (targetId, sourceId, timestamp) => {
    await api.conditions().duplicate(targetId, sourceId, timestamp);
  };

  const updateStrategy = async (strategyData) => {
    loading.update = true;
    const strategy = await api.strategies().update(strategyData);
    strategies.value = strategies.value.map((strategy) => {
      if (strategy._id === strategyData._id) {
        return strategyData;
      }
      return strategy;
    });
    loading.create = false;
    return strategy;
  };

  const createAction = async (actionData) => {
    loading.create = true;
    const action = await api.actions().add(actionData);
    actions.value.push(action);
    loading.create = false;
    return action;
  };

  const createCondition = async (conditionData) => {
    conditionData.instanceParams = conditionData.instanceParams || {};
    loading.create = true;
    const condition = await api.conditions().add(conditionData);
    conditions.value.push(condition);
    loading.create = false;
    return condition;
  };

  const getActionById = (actionId) => {
    return actions.value.find((action) => action._id === actionId);
  };

  const getConditionById = (conditionId) => {
    return conditions.value.find((condition) => condition._id === conditionId);
  };

  const setActionToUpdate = (action) => {
    actionToUpdate.value = action;
  };

  const setConditionToUpdate = (condition) => {
    console.log(condition);
    conditionToUpdate.value = condition;
  };

  const deleteAction = async (action) => {
    try {
      await api.actions().remove(action.strategyId, action._id);
      actions.value = actions.value.filter((a) => a._id !== action._id);
    } catch (error) {
      console.error(`remove action -> remove() ERROR: \n${error}`);
    }
  };

  const deleteCondition = async (condition) => {
    try {
      await api.conditions().remove(condition.strategyId, condition._id);
      conditions.value = conditions.value.filter(
        (c) => c._id !== condition._id
      );
    } catch (error) {
      console.error(`remove action > remove() ERROR: \n${error}`);
    }
  };

  const updateCondition = async (condition) => {
    try {
      await api.conditions().update({
        ...condition,
        params: condition.params || {},
        instanceParams: condition.instanceParams || {},
      });

      const filterConditions = conditions.value.filter(
        (c) => c._id !== condition._id
      );

      conditions.value = [...filterConditions, condition];
    } catch (error) {
      console.error(`update condition -> update() ERROR: \n${error}`);
    }
  };

  const updateAction = async (action) => {
    try {
      await api.actions().update({
        ...action,
      });

      const filterActions = actions.value.filter((a) => a._id !== action._id);

      actions.value = [...filterActions, action];
    } catch (error) {
      console.error(`update condition -> update() ERROR: \n${error}`);
    }
  };

  const updateActionRelations = async (source, actionId) => {
    const condition = { ...source };
    condition.successActionIds = [...source.successActionIds, actionId];
    updateCondition(condition);
  };

  const removeActionRelations = async (source, actionId) => {
    const condition = { ...source };
    condition.successActionIds = condition.successActionIds.filter(
      (id) => id !== actionId
    );
    updateCondition(condition);
  };

  const simulate = async (simulationTest) => {
    const response = await api.simulations().simulate({
      sections: [{ from: simulationTest.from, to: simulationTest.to }],
      strategyId: activeStrategy.value._id,
    });

    simulationResult.value = response;
  };

  const updateConditionRelations = async (source, conditionId) => {
    const condition = { ...source };
    condition.successConditionIds = [
      ...source.successConditionIds,
      conditionId,
    ];
    updateCondition(condition);
  };

  const removeConditionRelations = async (source, conditionId) => {
    const condition = { ...source };
    condition.successConditionIds = condition.successConditionIds.filter(
      (id) => id !== conditionId
    );
    updateCondition(condition);
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

  const addNode = (type) => {
    const node = createRawNode();
    if (type === NodeType.CONDITION) {
      conditions.value.push(node);
    } else if (type === NodeType.ACTION) {
      actions.value.push(node);
    }
  };

  const updateNode = async (proxyNode) => {
    const node = toRaw(proxyNode);

    switch (node.type) {
      case "action": {
        await updateAction({
          ...node.data.action,
          positionX: node.position.x,
          positionY: node.position.y,
        });
        break;
      }
      case "condition":
        await updateCondition({
          ...node.data.condition,
          params: node.data.condition.params || {},
          positionX: node.position.x,
          positionY: node.position.y,
        });
        break;

      default:
        break;
    }
  };

  return {
    autosave,
    loading,
    conditions,
    actions,
    strategies,
    resources,
    activeStrategy,
    activeLiveStrategy,
    actionToUpdate,
    conditionToUpdate,
    simulationResult,
    retrieveStrategies,
    setActionToUpdate,
    setConditionToUpdate,
    changeStrategy,
    createStrategy,
    duplicateActions,
    duplicateConditions,
    createLiveStrategy,
    updateStrategy,
    removeStrategy,
    createAction,
    createCondition,
    addNode,
    updateNode,
    getConditionById,
    getActionById,
    updateActionRelations,
    updateConditionRelations,
    switchActiveLiveStrategy,
    removeActionRelations,
    removeConditionRelations,
    deleteAction,
    deleteCondition,
    updateCondition,
    updateAction,
    simulate,
    getMinPeriodFromConditions,
    updateActiveLiveStrategyStatus,
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
