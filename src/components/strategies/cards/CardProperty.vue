<script setup>
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <span class="playground-card__value">{{ props.value }}</span>
    <span class="playground-card__label">{{ props.label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.playground-card__value {
  display: flex;
  flex-direction: column;
  padding-left: 0.2rem;
}
.playground-card__label {
  color: #5ccebc;
  font-weight: 600;
  padding-left: 0.2rem;
}
</style>
