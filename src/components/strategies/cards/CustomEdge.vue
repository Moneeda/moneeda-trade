<script setup>
import { getBezierPath, getEdgeCenter, useVueFlow } from "@braks/vue-flow";
import { Delete } from "@element-plus/icons-vue";
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

console.log(props.style);

const { applyEdgeChanges } = useVueFlow();

const foreignObjectSize = 80;
const foreignObjectHeight = 25;

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
    :height="foreignObjectHeight"
    :x="center[0] - foreignObjectSize / 2"
    :y="center[1]"
    class="edgebutton__wrapper"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <el-button
      ref="btn"
      type="danger"
      plain
      size="small"
      :icon="Delete"
      @click="(event) => onClick(event, id)"
    >
      clear
    </el-button>
  </foreignObject>
</template>
<style lang="scss"></style>
