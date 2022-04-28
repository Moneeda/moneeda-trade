<script setup>
import { Expand } from "@element-plus/icons-vue";
import StrategyFlow from "@/components/strategies/StrategyFlow.vue";
import StrategyPicker from "~/components/strategies/StrategyPicker.vue";
import StrategyActions from "../../components/strategies/StrategyActions.vue";
import { useLayout } from "~/core/useLayout";

const { layoutMode, switchLayout } = useLayout();
</script>

<template>
  <div class="h-full">
    <StrategyPicker />

    <div
      class="admin-playground"
      :class="{
        'admin-playground--two-cols': layoutMode === 'view',
        'admin-playground--three-cols': layoutMode === 'edit',
      }"
    >
      <StrategyFlow style="grid-area: flow" />

      <StrategyActions style="grid-area: actions" />

      <div
        class="bg-white shadow-xl p-4"
        style="grid-area: details"
        v-show="layoutMode === 'edit'"
      >
        <div class="flex justify-between">
          <h2>Details</h2>
          <el-button :icon="Expand" @click="switchLayout('view')"> </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-playground {
  padding: 16px;
  display: grid;
  grid-gap: 16px;
  height: 100%;

  &--two-cols {
    grid-template-columns: 1fr 200px;
    grid-template-areas: "flow actions";
  }

  &--three-cols {
    grid-template-columns: 1fr 1fr 200px;
    grid-template-areas: "flow details actions";
  }
}
</style>
