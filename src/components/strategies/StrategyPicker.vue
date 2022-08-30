<script setup>
import { Setting } from "@element-plus/icons-vue";
import { useLayout } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { useSimulations } from "~/core/useSimulations";

const { switchLayout } = useLayout();
const { activeSimulation } = useSimulations();
const { strategies, activeStrategy, changeStrategy, simulate, updateStrategy } =
  useStrategies();

const onChange = () => {
  updateStrategy(activeStrategy.value);
};
const onSimulate = async () => {
  await simulate(activeSimulation.value);
  switchLayout("result");
};
</script>

<template>
  <div class="flex justify-between items-center h-navbar bg-white px-8">
    <h1 class="text-xl font-medium">{{ $t("playgroundView.tittle") }}</h1>

    <div class="flex items-center">
      <div class="mr-4">
        <el-checkbox
          border
          v-if="!!activeStrategy"
          v-model="activeStrategy.isPeriodic"
          @change="onChange"
          >{{ $t("playgroundView.periodic") }}</el-checkbox
        >
      </div>
      <span class="text-content60">{{ $t("playgroundView.picker") }}</span>
      <el-select
        class="ml-2"
        v-model="activeStrategy"
        placeholder="Pick a strategy"
        value-key="_id"
        @change="changeStrategy"
      >
        <el-option
          v-for="strategy in strategies"
          :key="strategy._id"
          :label="strategy.label"
          :value="strategy"
        />
      </el-select>

      <el-button
        type="primary"
        class="ml-6"
        :icon="Setting"
        @click="onSimulate"
      >
        {{ $t("playgroundView.runSimulation") }}
      </el-button>
    </div>
  </div>
</template>
