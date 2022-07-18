<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <span class="playground-card__text">{{ props.text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.playground-card__text {
  text-transform: capitalize;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
  color: #7d7b8b;
  padding-left: 0.2rem;
}
</style>
