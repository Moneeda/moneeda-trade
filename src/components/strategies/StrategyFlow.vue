<script setup>
import {
  VueFlow,
  Controls,
  Background,
  isNode,
  useVueFlow,
} from "@braks/vue-flow";
import { computed } from "vue";
import { useStrategies } from "~/core/useStrategies";
import { buildNodes } from "./strategyFlowHelper";

const { conditions, actions } = useStrategies();

const elements = computed(() => {
  return buildNodes(conditions.value, actions.value);
});

const { onPaneReady, onNodeDragStop, onConnect, instance, addEdges } =
  useVueFlow();
onPaneReady(({ fitView }) => {
  fitView();
});
onNodeDragStop((e) => console.log("drag stop", e));
onConnect((params) => addEdges([params]));

const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      };
    }
  });

const logToObject = () => console.log(instance.value?.toObject());
const resetTransform = () =>
  instance.value?.setTransform({ x: 0, y: 0, zoom: 1 });
const toggleclass = () =>
  elements.value.forEach(
    (el) => (el.class = el.class === "light" ? "dark" : "light")
  );
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
