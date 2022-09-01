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
  updateStrategy,
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
const productToTest = computed(() => {
  return activeStrategy.value ? activeStrategy.value.product : [];
});

const selectedModel = computed(() => {
  return activeSimulation.value ? activeSimulation.value.id : undefined;
});

const selectedModelDescription = computed(() => {
  return activeSimulation.value.description;
});

const availableSimulationTest = computed(() => {
  return getValidSimulations(productToTest.value, minPeriod.value);
});

const onChange = () => {
  updateStrategy(activeStrategy.value);
};
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
      value-key="id"
      default-first-option
      :model-value="selectedModel"
      @change="changeSimulation"
      fit-input-width
    >
      <el-option-group label="Trend based">
        <el-popover
          placement="left"
          trigger="hover"
          :width="300"
          v-for="simulation in availableSimulationTest"
          :key="simulation.id"
        >
          <h4 class="font-medium mb-2">{{ simulation.name }}</h4>
          <p class="text-content text-sm">{{ simulation.description }}</p>
          <template #reference>
            <el-option :label="simulation.name" :value="simulation.id" />
          </template>
        </el-popover>
      </el-option-group>
    </el-select>

    <p class="text-xs text-lightcontent mt-2">
      {{
        selectedModel
          ? selectedModelDescription
          : this.$t("playgroundView.pickSimulation")
      }}
    </p>

    <h3 class="mt-4">{{ $t("playgroundView.options") }}</h3>
    <div class="my-2">
      <el-checkbox
        v-if="!!activeStrategy"
        v-model="activeStrategy.isPeriodic"
        @change="onChange"
      >
        <el-popover placement="left" trigger="hover" :width="300">
          <h4 class="font-medium mb-2" v-t="'playgroundView.periodic'"></h4>
          <p class="text-content text-sm">
            A periodic strategy means that XXXX
          </p>
          <template #reference>
            {{ $t("playgroundView.periodic") }}
          </template>
        </el-popover>
      </el-checkbox>
    </div>

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
