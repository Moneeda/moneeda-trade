<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="playground-card__text" v-text="props.text"></div>
</template>

<style lang="scss" scoped>
.playground-card__text {
  text-transform: capitalize;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: #7d7b8b;
  padding-left: 0.2rem;
}
</style>
