<script setup>
const props = defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="pl-1">
    <span class="playground-card__label">{{ props.label }}</span>
    <span class="playground-card__value">{{ props.value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.playground-card__value {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}
.playground-card__label {
}
</style>
