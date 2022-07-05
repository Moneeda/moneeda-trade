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

const { layoutMode } = useLayout();
const { simulations, changeSimulation, activeSimulation } = useSimulations();
const { autosave, addNode } = useStrategies();
const nodeTypes = NodeType;
</script>

<template>
  <div class="bg-white box-shadow p-4 flex flex-col items-start justify-start">
    <h3>Mode</h3>

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
      <el-radio-button label="edit">
        <el-icon>
          <ScaleToOriginal />
        </el-icon>
      </el-radio-button>
    </el-radio-group>

    <h3 class="mt-4">Actions</h3>

    <!-- Wrapped because element adds a margin between two buttons -->
    <div class="mt-2 w-full">
      <el-button
        color="#626aef"
        plain
        :icon="SetUp"
        class="w-full"
        @click="addNode(nodeTypes.CONDITION)"
      >
        Add condition
      </el-button>
    </div>
    <div class="mt-2 w-full">
      <el-button
        :icon="TrendCharts"
        class="w-full"
        plain
        color="#626aef"
        @click="addNode(nodeTypes.ACTION)"
      >
        Add result
      </el-button>
    </div>

    <h3 class="mt-4">Simulation</h3>
    <el-select
      v-model="activeSimulation"
      placeholder="Pick a simulation"
      @change="changeSimulation"
      fit-input-width
      value-key="_id"
    >
      <el-option-group label="Time based">
        <el-popover
          placement="left"
          trigger="hover"
          v-for="simulation in simulations"
          :key="simulation._id"
        >
          <h4 class="font-medium">{{ simulation.name }}</h4>
          <p>{{ simulation.description }}</p>
          <template #reference>
            <el-option :label="simulation.label" :value="simulation" />
          </template>
        </el-popover>
      </el-option-group>
      <el-option-group label="Trend based"> </el-option-group>
    </el-select>

    <el-button :icon="Select" class="w-full mt-8" plain> Save </el-button>
    <el-checkbox
      v-model="autosave"
      label="Autosave changes"
      size="small"
    ></el-checkbox>
  </div>
</template>
