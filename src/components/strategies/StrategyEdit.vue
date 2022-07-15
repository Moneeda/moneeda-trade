<script setup>
import { useLayout } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { Expand } from "@element-plus/icons-vue";
import { computed, toRaw } from "vue";
import { JsonForms } from "@jsonforms/vue";
import { vanillaRenderers } from "@jsonforms/vue-vanilla";
import { NodeType } from "./strategyFlowHelper";

const { layoutMode } = useLayout();
const { resources, activeStrategy, createAction, createCondition } =
  useStrategies();

const resourceType = computed(() => layoutMode.value);
const jsonResource = computed(() => {
  return resources.value[resourceType.value];
});
const strategy = computed(() => {
  return toRaw(activeStrategy.value);
});
let rawData;

const renderers = Object.freeze([
  ...vanillaRenderers,
  // here you can add custom renderers
]);

const conditionDataAdapter = (data) => {
  const parsedCondition = {
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
  return parsedCondition;
};

const actionDataAdapter = (data) => {
  const action = {
    strategyId: strategy.value._id,
    type: data.type,
    instanceParams: [],
    method: "exec",
    params: data[`${data.type}`].params,
    positionX: 0,
    positionY: 0,
  };
  return action;
};

const onChange = (data) => {
  rawData = data.data;
};

const onSave = async () => {
  if (resourceType.value === NodeType.CONDITION) {
    const condition = conditionDataAdapter(toRaw(rawData));
    await createCondition(condition);
  } else if (resourceType.value === NodeType.ACTION) {
    const action = actionDataAdapter(toRaw(rawData));
    await createAction(action);
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h2>Details</h2>
      <h2>{{ resourceType }}</h2>
      <el-button :icon="Expand" @click="switchLayout('view')" disabled>
      </el-button>
    </div>
    <json-forms
      v-if="jsonResource"
      :data="rawData"
      :renderers="renderers"
      :schema="jsonResource.schema"
      :uischema="jsonResource.uischema"
      @change="onChange"
    />
    <el-button @click="onSave" type="primary" class="mt-4">
      {{ $t("strategyEdit.submit") }}
    </el-button>
  </div>
</template>
