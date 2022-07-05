<script setup>
import {
  VueFlow,
  Controls,
  Background,
  isNode,
  useVueFlow,
} from "@braks/vue-flow";
import { ref, watchEffect } from "vue";
import { useStrategies } from "~/core/useStrategies";
import { buildNodes, updateNodePos } from "./strategyFlowHelper";

const { conditions, actions, autosave, updateNode } = useStrategies();

const elements = ref([]);

const { onPaneReady, onNodeDragStop, onConnect, instance, addEdges } =
  useVueFlow();

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
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background pattern-color="#aaa" gap="8" />
    <Controls />
  </VueFlow>
</template>
