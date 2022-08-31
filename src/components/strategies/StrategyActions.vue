<script setup>
import {
  ScaleToOriginal,
  Select,
  Files,
  SetUp,
  TrendCharts,
} from "@element-plus/icons-vue";
import { useLayout } from "~/core/useLayout";
import { useSimulations } from "~/core/useSimulations";
import { useStrategies } from "~/core/useStrategies";
import { NodeType } from "~/components/strategies/strategyFlowHelper";
import { computed } from "@vue/reactivity";

const { layoutMode, switchLayout } = useLayout();
const { changeSimulation, activeSimulation, getValidSimulations } =
  useSimulations();
const {
  autosave,
  setActionToUpdate,
  setConditionToUpdate,
  getMinPeriodFromConditions,
  activeStrategy,
} = useStrategies();
const nodeTypes = NodeType;

const add = (type) => {
  setActionToUpdate(undefined);
  setConditionToUpdate(undefined);
  switchLayout(type);
};

const minPeriod = computed({
  get() {
    return getMinPeriodFromConditions();
  },
});
const productToTest = computed({
  get() {
    return activeStrategy.value ? activeStrategy.value.product : [];
  },
});

const selectedModel = computed({
  get() {
    return activeSimulation.value ? activeSimulation.value.name : undefined;
  },
  set() {},
});

const availableSimulationTest = computed({
  get() {
    return getValidSimulations(productToTest.value, minPeriod.value);
  },
});
</script>

<template>
  <div class="bg-white box-shadow p-4 flex flex-col items-start justify-start">
    <h3>{{ $t("playgroundView.mode") }}</h3>

    <el-radio-group
      v-model="layoutMode"
      fill="#ffe2ddb3"
      text-color="rgba(0,0,0,0.8)"
    >
      <el-radio-button label="view">
        <el-icon>
          <Files />
        </el-icon>
      </el-radio-button>
      <el-radio-button label="details">
        <el-icon>
          <ScaleToOriginal />
        </el-icon>
      </el-radio-button>
    </el-radio-group>

    <h3 class="mt-4">{{ $t("playgroundView.actions") }}</h3>

    <!-- Wrapped because element adds a margin between two buttons -->
    <div class="mt-2 w-full">
      <el-button
        color="#626aef"
        plain
        :icon="SetUp"
        class="w-full"
        @click="add(nodeTypes.CONDITION)"
      >
        {{ $t("playgroundView.condition") }}
      </el-button>
    </div>
    <div class="mt-2 w-full">
      <el-button
        :icon="TrendCharts"
        class="w-full"
        plain
        color="#10b981"
        @click="add(nodeTypes.ACTION)"
      >
        {{ $t("playgroundView.result") }}
      </el-button>
    </div>

    <h3 class="mt-4">{{ $t("playgroundView.simulation") }}</h3>
    <el-select
      placeholder="Pick a simulation"
      v-model="selectedModel"
      @change="changeSimulation"
      fit-input-width
    >
      <el-option-group label="Trend based">
        <el-popover
          placement="left"
          trigger="hover"
          v-for="simulation in availableSimulationTest"
          :key="simulation.id"
        >
          <h4 class="font-medium">{{ simulation.name }}</h4>
          <p>{{ simulation.description }}</p>
          <template #reference>
            <el-option :label="simulation.name" :value="simulation" />
          </template>
        </el-popover>
      </el-option-group>
    </el-select>

    <el-button :icon="Select" class="w-full mt-8" plain>{{
      $t("playgroundView.save")
    }}</el-button>
    <el-checkbox
      v-model="autosave"
      label="Autosave changes"
      size="small"
    ></el-checkbox>
  </div>
</template>
