<script setup>
import {
  Bicycle,
  Cherry,
  Bowl,
  Chicken,
  Apple,
  CoffeeCup,
  IceCream,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";
import { computed } from "vue";
import format from "date-fns/format";

const props = defineProps({
  strategy: {
    type: Object,
    required: true,
  },
});


const internalStrategy = Object.assign({}, props.strategy);

const icons = [Bicycle, Cherry, Bowl, Chicken, Apple, CoffeeCup, IceCream];
const icon = icons[props.strategy.numId % icons.length];
const formattedDate = computed(() => {
  return format(new Date(props.strategy.createdAt), "yyyy-MM-dd HH:mm:ss");
});
</script>

<template>
  <div class="strategy-card">
    <div class="flex flex-col items-center">
      <el-icon :size="24">
        <component :is="icon" />
      </el-icon>
      <el-tag class="mt-2">{{ strategy.status }}</el-tag>
    </div>

    <div class="flex-1">
      <h4 class="font-medium">
        {{ strategy.name }}
      </h4>
      <div>{{ strategy.description }}</div>
      <div class="text-xs text-content60">{{ formattedDate }}</div>
    </div>
    <div class="flex-[0 0 80px]">
      <div>{{ strategy.product }}</div>
      <div>
        {{ strategy.baseCurrencyAmount }} - {{ strategy.quoteCurrencyAmount }}
      </div>
    </div>
    <el-button
      type="warning"
      :icon="EditPen"
      circle
      size="small"
      class="strategy-card__edit"
      @click.stop="[$emit('update', internalStrategy)]"
    />
    <el-button
      type="danger"
      :icon="Delete"
      circle
      size="small"
      class="strategy-card__remove"
      @click.stop="$emit('remove')"
    />
  </div>
</template>

<style lang="scss" scoped>
.strategy-card {
  display: flex;
  background-color: rgba(white, 0.8);
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  gap: 12px;
  min-height: 90px;
  position: relative;

  &:hover {
    @apply shadow-xl;
    background-color: white;

    .strategy-card__edit {
      visibility: visible;
      opacity: 1;
    }

    .strategy-card__remove {
      visibility: visible;
      opacity: 1;
    }
  }

   &__edit {
    visibility: hidden;
    position: absolute;
    top: -8px;
    right: 24px;
    opacity: 0;
    transition: all ease-in 0.1s;
  }

  &__remove {
    visibility: hidden;
    position: absolute;
    top: -8px;
    right: -8px;
    opacity: 0;
    transition: all ease-in 0.1s;
  }
}
</style>
