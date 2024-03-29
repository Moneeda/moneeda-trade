<script setup>
import { VueFlow, Controls, Background, useVueFlow } from "@braks/vue-flow";
import { markRaw, ref, watchEffect } from "vue";
import { useStrategies } from "~/core/useStrategies";
import { buildNodes } from "./strategyFlowHelper";
import ConditionNode from "./nodes/ConditionNode.vue";
import ActionNode from "./nodes/ActionNode.vue";
import CustomEdge from "./cards/CustomEdge.vue";

const {
  conditions,
  actions,
  updateNode,
  getConditionById,
  getActionById,
  updateActionRelations,
  updateConditionRelations,
  removeActionRelations,
  removeConditionRelations,
} = useStrategies();

const nodeTypes = {
  condition: markRaw(ConditionNode),
  action: markRaw(ActionNode),
};

const elements = ref([]);
let fitFlowView;

const { onPaneReady, onNodeDragStop, onConnect, addEdges } = useVueFlow();

watchEffect(() => {
  elements.value = buildNodes(conditions.value, actions.value);
});

onPaneReady(({ fitView }) => {
  elements.value = buildNodes(conditions.value, actions.value);
  fitFlowView = fitView;
  setTimeout(fitFlowView, 1000);
});

onNodeDragStop(async ({ node }) => {
  await updateNode(node);
  elements.value = buildNodes(conditions.value, actions.value);
});
onConnect((params) => {
  const style = {
    stroke: "#5ccebc",
    strokeWidth: 4,
  };
  params = { ...params, style };
  addEdges([params]);
  const sourceCondition = getConditionById(params.source);
  const targetCondition = getConditionById(params.target);
  const targetAction = getActionById(params.target);

  if (!sourceCondition) throw new Error("Source Condition does not exist");
  if (!targetCondition && !targetAction)
    throw new Error("Target does not exist");

  if (targetAction) {
    updateActionRelations(sourceCondition, targetAction._id);
  } else if (targetCondition) {
    updateConditionRelations(sourceCondition, targetCondition._id);
  }
});

const onEdgeRemove = (event, id) => {
  const [source, target] = id.split("/");
  console.log(source, target);
  const sourceCondition = getConditionById(source);
  const targetCondition = getConditionById(target);
  const targetAction = getActionById(target);

  if (!sourceCondition) throw new Error("Source Condition does not exist");
  if (!targetCondition && !targetAction)
    throw new Error("Target does not exist");

  if (targetAction) {
    removeActionRelations(sourceCondition, targetAction._id);
  } else if (targetCondition) {
    removeConditionRelations(sourceCondition, targetCondition._id);
  }
};
</script>
<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :node-types="nodeTypes"
    :default-zoom="1"
    :min-zoom="0.2"
    :max-zoom="1"
  >
    <template #edge-custom="props">
      <CustomEdge @onRemove="onEdgeRemove" v-bind="props" />
    </template>
    <Background pattern-color="#aaa" gap="8" />
    <Controls />
  </VueFlow>
</template>
