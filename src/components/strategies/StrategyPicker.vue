<script setup>
import { Setting } from "@element-plus/icons-vue";
import { useStrategies } from "~/core/useStrategies";
const { strategies, activeStrategy, changeStrategy } = useStrategies();
</script>

<template>
  <div class="flex justify-between items-center h-navbar bg-white px-8">
    <h1 class="text-xl font-medium">Playground</h1>

    <div class="flex items-center">
      <span class="text-content60">Strategy</span>
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

      <el-button type="primary" class="ml-6" :icon="Setting">
        Run simulation
      </el-button>
    </div>
  </div>
</template>
