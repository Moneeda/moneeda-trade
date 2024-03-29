<script setup>
import { Setting, DataAnalysis } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useLayout, LayoutType } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { useSimulations } from "~/core/useSimulations";
import { ref, computed } from "vue";

const { switchLayout } = useLayout();
const { activeSimulation, customRange } = useSimulations();
const {
  strategies,
  activeStrategy,
  activeLiveStrategy,
  switchActiveLiveStrategy,
  changeStrategy,
  simulate,
  simulationResult,
} = useStrategies();
const router = useRouter();
const switchValue = computed({
  get: () =>
    !!activeLiveStrategy.value && activeLiveStrategy.value.status === "active",
  set: () => {
    switchActiveLiveStrategy();
  },
});

const isActiveSimulationSet = computed(() => !!activeSimulation.value);
const iscustomRangeSet = computed(
  () => !!customRange.value.start && !!customRange.value.end
);

const loading = ref(false);
const onSimulate = async () => {
  loading.value = true;
  if (activeSimulation.value) {
    await simulate(activeSimulation.value);
  } else if (iscustomRangeSet.value) {
    const range = customRange.value
    await simulate({
      from: (new Date(range.start)).getTime(),
      to: (new Date(range.end)).getTime()
    });
  }
  loading.value = false;
  if (simulationResult.value) {
    showResults();
  }
};
const showResults = () => switchLayout(LayoutType.RESULT);
const goToStrategy = (strategyId) => {
  changeStrategy(strategyId);
  router.push({
    name: "playground",
    params: {
      id: strategyId,
    },
  });
};

const activeStrategyId = computed(() => activeStrategy.value?._id || null);
</script>

<template>
  <div class="flex justify-between items-center h-navbar bg-white px-8">
    <h1 class="text-xl font-medium">{{ $t("playgroundView.tittle") }}</h1>

    <div class="flex items-center">
      <el-switch v-model="switchValue" class="mr-6" :active-text="$t('playgroundView.status.active')"
        :inactive-text="$t('playgroundView.status.paused')" />
      <span class="text-content60">{{ $t("playgroundView.picker") }}</span>
      <el-select class="ml-2" :model-value="activeStrategyId" placeholder="Pick a strategy" value-key="_id"
        @change="goToStrategy">
        <el-option v-for="strategy in strategies" :key="strategy._id" :label="strategy.name" :value="strategy._id" />
      </el-select>
      <h3>{{ customRange.start }} {{ customRange.end }} {{ iscustomRangeSet }}</h3>
      <el-button type="primary" :disabled="!isActiveSimulationSet && !iscustomRangeSet" class="ml-4 sm:ml-0"
        :icon="Setting" @click="onSimulate" :loading="loading">
        {{ $t("playgroundView.runSimulation") }}
      </el-button>
      <el-button v-if="simulationResult" class="ml-4 sm:ml-0" size="small" text :icon="DataAnalysis" @click="showResults">
        {{ $t("playgroundView.latestResult") }}
      </el-button>
    </div>
  </div>
</template>
