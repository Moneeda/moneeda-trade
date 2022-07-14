<script setup>
import { CardSize, CardColor, Scale } from "./types";
defineProps({
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: CardSize.small,
  },
  color: {
    type: String,
    default: CardColor.blue,
  },
  scale: {
    type: String,
    default: Scale.normal,
  },
});
</script>

<template>
  <div
    class="playground-card"
    :style="{
      border: `solid ${color}`,
      width: cardsize,
      transform: `scale${scale}`,
    }"
  >
    <div class="type-method" :style="{ backgroundColor: color }">
      <span class="playground-card__title">{{ title }}</span>
    </div>
    <div class="playground-card-details">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.playground-card {
  width: 15rem;
  height: 11rem;
  border-radius: 1.2rem;
  box-shadow: 0 2px 30px 2px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  display: grid;
  align-items: start;

  &__title {
    color: white;
  }
}

.type-method {
  text-transform: uppercase;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1rem;
  border-radius: 0.8rem 0.8rem 0 0;
  height: 3rem;
  width: 14.66rem;
  font-weight: 600;
  padding-left: 0.8rem;
}

.playground-card__details {
  padding-left: 0.6rem;
}

.card-details > * {
  margin-top: 0.4rem;
}
</style>
