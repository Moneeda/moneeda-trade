<script setup>
import StrategyFlow from "@/components/strategies/StrategyFlow.vue";
import StrategyPicker from "~/components/strategies/StrategyPicker.vue";
import StrategyActions from "../../components/strategies/StrategyActions.vue";
import { useLayout, LayoutType as _LayoutType } from "~/core/useLayout";
import StrategyEdit from "~/components/strategies/StrategyEdit.vue";
import ShowResultModal from "~/components/strategies/ShowResultModal.vue";

const { layoutMode, isThreeCols } = useLayout();
const LayoutType = _LayoutType;
</script>

<template>
  <div class="h-full">
    <StrategyPicker />

    <div
      class="admin-playground"
      :class="{
        'admin-playground--two-cols': !isThreeCols,
        'admin-playground--three-cols': isThreeCols,
      }"
    >
      <StrategyFlow style="grid-area: flow" />

      <StrategyActions style="grid-area: actions" />

      <div
        class="bg-white shadow-xl p-4"
        style="grid-area: details"
        v-show="
          layoutMode === LayoutType.ACTION ||
          layoutMode === LayoutType.CONDITION
        "
      >
        <StrategyEdit />
      </div>

      <ShowResultModal v-if="layoutMode === LayoutType.RESULT" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-playground {
  padding: 16px;
  display: grid;
  grid-gap: 16px;
  height: calc(100% - 60px); // strategy picker;

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
