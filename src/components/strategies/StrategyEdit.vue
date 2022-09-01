<script setup>
import { useLayout, LayoutType } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { Close } from "@element-plus/icons-vue";
import { ref, computed, toRaw, watchEffect } from "vue";
import { JsonForms } from "@jsonforms/vue";
import {
  vanillaRenderers,
  mergeStyles,
  defaultStyles,
} from "@jsonforms/vue-vanilla";
import { NodeType } from "./strategyFlowHelper";

let rawData = ref(undefined);
const { layoutMode, switchLayout } = useLayout();
const {
  resources,
  activeStrategy,
  createAction,
  createCondition,
  conditionToUpdate,
  actionToUpdate,
  updateCondition,
  updateAction,
  setActionToUpdate,
  setConditionToUpdate,
} = useStrategies();

const resourceType = computed(() => layoutMode.value);
const isUpdate = computed(
  () => !!conditionToUpdate.value || !!actionToUpdate.value
);
const jsonResource = computed(() => {
  return resources.value[resourceType.value];
});

watchEffect(() => {
  rawData.value = undefined;
  switch (resourceType.value) {
    case NodeType.CONDITION:
      if (!conditionToUpdate.value) return;
      parseConditionRawData(toRaw(conditionToUpdate.value));
      break;
    case NodeType.ACTION:
      if (!actionToUpdate.value) return;
      parseActionRawData(toRaw(actionToUpdate.value));
      break;
  }
});

const parseActionRawData = (data) => {
  const params = data.params;
  const action = {
    type: data.type,
    [`${data.type}`]: {
      params: params[0],
    },
  };
  rawData.value = action;
};

const parseConditionRawData = (data) => {
  const method = data.method;
  const params = { [`${data.method}`]: data.params };
  const instanceParams = data.instanceParams;
  const condition = {
    type: data.type,
    period: data.period,
    product: data.product,
    startBeginning: data.startBeginning,
    [`${data.type}`]: {
      instanceParams: instanceParams,
      method: method,
      params: params,
    },
  };
  rawData.value = condition;
};

const strategy = computed(() => {
  return toRaw(activeStrategy.value);
});

const renderers = Object.freeze([...vanillaRenderers]);

const conditionDataAdapter = (parsedData) => {
  const data = toRaw(parsedData.value);
  let parsedCondition = {
    strategyId: strategy.value._id,
    startBeginning: data?.startBeginning || false,
    product: data.product,
    isActive: false,
    type: data.type,
    successConditionIds: [],
    successActionIds: [],
    period: data.period,
    instanceParams: toRaw(data[`${data.type}`].instanceParams),
    method: data[`${data.type}`].method,
    params: data[`${data.type}`][`params`]
      ? data[`${data.type}`][`params`][`${data[`${data.type}`].method}`]
        ? data[`${data.type}`][`params`][`${data[`${data.type}`].method}`]
        : {}
      : {},
    positionX: 0,
    positionY: 0,
  };

  if (isUpdate.value) {
    parsedCondition = {
      ...parsedCondition,
      _id: conditionToUpdate.value._id,
      isActive: conditionToUpdate.value.isActive,
      successConditionIds: conditionToUpdate.value.successConditionIds,
      successActionIds: conditionToUpdate.value.successActionIds,
      positionX: conditionToUpdate.value.positionX,
      positionY: conditionToUpdate.value.positionY,
    };
  }
  return parsedCondition;
};

const actionDataAdapter = (parsedData) => {
  const data = toRaw(parsedData.value);
  let action = {
    strategyId: strategy.value._id,
    type: data.type,
    instanceParams: [],
    method: "exec",
    params: [data[`${data.type}`].params],
    positionX: 0,
    positionY: 0,
  };

  if (isUpdate.value) {
    action = {
      ...action,
      _id: actionToUpdate.value._id,
      positionX: actionToUpdate.value.positionX,
      positionY: actionToUpdate.value.positionY,
    };
  }

  return action;
};

const onChange = (data) => {
  rawData.value = data.data;
};

const closeView = () => {
  setActionToUpdate(undefined);
  setConditionToUpdate(undefined);
  switchLayout(LayoutType.VIEW);
};

const onSave = async () => {
  if (resourceType.value === NodeType.CONDITION) {
    const condition = conditionDataAdapter(toRaw(rawData));
    await createCondition(condition);
  } else if (resourceType.value === NodeType.ACTION) {
    const action = actionDataAdapter(toRaw(rawData));
    await createAction(action);
  }
  closeView();
};
const onUpdate = async () => {
  if (resourceType.value === NodeType.CONDITION) {
    const condition = conditionDataAdapter(toRaw(rawData));
    await updateCondition(condition);
  } else if (resourceType.value === NodeType.ACTION) {
    const action = actionDataAdapter(toRaw(rawData));
    await updateAction(action);
  }
  closeView();
};
</script>

<script>
// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, {
  control: {
    label: "form-label",
    select: "form-select el-select",
    input: "form-input",
  },
});

export default {
  provide: {
    styles: myStyles,
  },
};
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h2>Edit {{ resourceType }}</h2>
      <el-button :icon="Close" @click="closeView"> </el-button>
    </div>
    <json-forms
      class="my-form"
      v-if="jsonResource"
      :data="rawData"
      :renderers="renderers"
      :schema="jsonResource.schema"
      :uischema="jsonResource.uischema"
      @change="onChange"
    />
    <el-button
      @click="isUpdate ? onUpdate() : onSave()"
      type="primary"
      class="float-right"
    >
      {{ $t("strategyEdit.submit") }}
    </el-button>
  </div>
</template>

<style lang="scss">
fieldset {
  margin-bottom: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0px 12px 12px 12px;

  legend {
    font-size: 10px;
    background-color: #fd70651f;
    padding: 4px 6px;
    border-radius: 6px;
    color: theme("colors.lightcontent");
    text-transform: uppercase;
  }
}

.my-form {
  margin-bottom: 12px;
  max-height: 60vh;
  overflow: auto;
}

.form-select,
.form-input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 4px 11px;
}

.form-label {
  margin-top: 12px;
  display: block;
}
</style>
