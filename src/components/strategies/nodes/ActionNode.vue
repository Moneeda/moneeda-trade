<script setup>
import { Handle, Position } from "@braks/vue-flow";
import ActionCard from "./ActionCard.vue";
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
    <ActionCard :action="data.action" />
    <template />
  </div>
</template>
