<script setup>
import { getBezierPath, getEdgeCenter, useVueFlow } from "@braks/vue-flow";
import { computed } from "vue";
const emit = defineEmits(["onRemove"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const { applyEdgeChanges } = useVueFlow();

const foreignObjectSize = 40;

const onClick = (evt, id) => {
  applyEdgeChanges([{ type: "remove", id }]);
  emit("onRemove", evt, id);
};

const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })
);

const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  })
);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <path
    :id="id"
    :style="style"
    class="vue-flow__edge-path"
    :d="edgePath"
    :marker-end="markerEnd"
  />
  <foreignObject
    :width="foreignObjectSize"
    :height="foreignObjectSize"
    :x="center[0] - foreignObjectSize / 2"
    :y="center[1] - foreignObjectSize / 2"
    class="edgebutton__wrapper"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <button ref="btn" class="edgebutton" @click="(event) => onClick(event, id)">
      ×
    </button>
  </foreignObject>
</template>
<style lang="scss">
.edgebutton {
  border-radius: 999px;
  cursor: pointer;
  background: #f00;
  border-radius: 2em;
  color: white;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  height: 24px;
  line-height: 2px;
  margin: 8px;
  text-align: center;
  width: 24px;
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.edgebutton:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease-in-out;
}
</style>
