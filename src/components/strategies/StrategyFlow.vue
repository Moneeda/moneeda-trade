<script setup>
import { VueFlow, Controls, Background, useVueFlow } from "@braks/vue-flow";
import { markRaw, ref, watchEffect } from "vue";
import { useStrategies } from "~/core/useStrategies";
import { buildNodes, updateNodePos } from "./strategyFlowHelper";
import ConditionNode from "./nodes/ConditionNode.vue";
import ActionNode from "./nodes/ActionNode.vue";

const { conditions, actions, autosave, updateNode } = useStrategies();

const nodeTypes = {
  condition: markRaw(ConditionNode),
  action: markRaw(ActionNode),
};

const elements = ref([]);

const { onPaneReady, onNodeDragStop, onConnect, addEdges } = useVueFlow();

watchEffect(() => {
  elements.value = buildNodes(conditions.value, actions.value);
});

onPaneReady(({ fitView }) => {
  fitView();
  elements.value = buildNodes(conditions.value, actions.value);
});
onNodeDragStop(({ event, node }) => {
  updateNodePos(node, { x: event.x, y: event.y });
  if (autosave.value) {
    updateNode(node);
  }
});
onConnect((params) => addEdges([params]));
</script>
<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :node-types="nodeTypes"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background pattern-color="#aaa" gap="8" />
    <Controls />
  </VueFlow>
</template>
