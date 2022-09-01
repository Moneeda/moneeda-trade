<script setup>
import { Setting, DataAnalysis } from "@element-plus/icons-vue";
import { useLayout, LayoutType } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { useSimulations } from "~/core/useSimulations";
import { ref, computed } from "vue";

const { switchLayout } = useLayout();
const { activeSimulation } = useSimulations();
const {
  strategies,
  activeStrategy,
  changeStrategy,
  simulate,
  simulationResult,
} = useStrategies();

const loading = ref(false);
const onSimulate = async () => {
  loading.value = true;
  await simulate(activeSimulation.value);
  loading.value = false;
  showResults();
};
const showResults = () => switchLayout(LayoutType.RESULT);

const activeStrategyId = computed(() => activeStrategy.value?._id || null);
</script>

<template>
  <div class="flex justify-between items-center h-navbar bg-white px-8">
    <h1 class="text-xl font-medium">{{ $t("playgroundView.tittle") }}</h1>

    <div class="flex items-center">
      <span class="text-content60">{{ $t("playgroundView.picker") }}</span>
      <el-select
        class="ml-2"
        :model-value="activeStrategyId"
        placeholder="Pick a strategy"
        value-key="_id"
        @change="changeStrategy"
      >
        <el-option
          v-for="strategy in strategies"
          :key="strategy._id"
          :label="strategy.label"
          :value="strategy._id"
        />
      </el-select>

      <el-button
        type="primary"
        class="ml-6"
        :icon="Setting"
        @click="onSimulate"
        :loading="loading"
      >
        {{ $t("playgroundView.runSimulation") }}
      </el-button>
      <el-button
        v-if="simulationResult"
        class="ml-4"
        size="small"
        text
        :icon="DataAnalysis"
        @click="showResults"
      >
        {{ $t("playgroundView.latestResult") }}
      </el-button>
    </div>
  </div>
</template>
