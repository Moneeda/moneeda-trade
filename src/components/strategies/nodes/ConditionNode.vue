<script setup>
import { Handle, Position } from "@braks/vue-flow";
import ConditionCard from "./ConditionCard.vue";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <Handle
      :id="data.action._id"
      type="target"
      :position="Position.Left"
      :style="{
        position: 'absolute',
        background: '#555',
        zIndex: '1',
      }"
    />
    <ConditionCard :condition="data.condition" />
    <Handle
      :id="data.action._id"
      type="source"
      :position="Position.Right"
      :style="{ position: 'absolute', background: '#555' }"
    />
  </div>
</template>
