<script setup>
import { CardSize, CardType } from "./types";
defineProps({
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: CardSize.small,
  },
  type: {
    type: String,
    default: CardType.INFO,
  },
});
</script>

<template>
  <div
    class="playground-card"
    :class="`playground-card--${type}`"
    :style="{
      width: size,
    }"
  >
    <div class="type-method" :class="`type-method--${type}`">
      <span class="playground-card__title">{{ title }}</span>
    </div>
    <div class="playground-card__details">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.playground-card {
  width: 15rem;
  height: 11rem;
  border-radius: 6px;
  background: #ffffff;
  align-items: start;
  overflow: hidden;

  &--sell {
    box-shadow: 0 2px 20px 2px rgba(231, 246, 253, 0.8),
      0 0 0 1px rgba(231, 246, 253, 0.5);
    border: 0.5px solid #0ea5e9;
  }

  &--info {
    box-shadow: 0 2px 20px 2px rgba(239, 240, 253, 0.8),
      0 0 0 1px rgba(239, 240, 253, 0.5);
    border: 0.5px solid #626aef;
  }

  &--success {
    box-shadow: 0 2px 20px 2px rgba(231, 248, 242, 0.8),
      0 0 0 1px rgba(231, 248, 242, 0.5);
    border: 0.5px solid #10b981;
  }

  &__details {
    padding: 12px;
  }
}

.type-method {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-size: 1rem;
  height: 3rem;
  width: 100%;
  font-weight: 600;
  padding: 0 0.8rem;
  color: theme("colors.content");

  &--sell {
    background-color: rgb(231, 246, 253);
    color: #0ea5e9;
  }

  &--info {
    background-color: rgb(239, 240, 253);
    color: #626aef;
  }

  &--success {
    background-color: rgb(231, 248, 242);
    color: #10b981;
  }
}
</style>
