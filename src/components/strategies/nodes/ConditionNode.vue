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
      :position="Position.Right"
      :style="{
        position: 'absolute',
        background: '#555',
        left: '48px',
        zIndex: '1',
      }"
    />
    <ConditionCard :condition="data.condition" />
    <Handle
      :id="data.action._id"
      type="source"
      :position="Position.Right"
      :style="{ position: 'absolute', background: '#555', right: '48px' }"
    />
  </div>
</template>
