<script setup>
import { ref, computed } from "vue";
import { useLayout, LayoutType } from "~/core/useLayout";
import { useSimulations } from "~/core/useSimulations";
import { useStrategies } from "~/core/useStrategies";

const { simulationResult, activeStrategy } = useStrategies();
const { activeSimulation } = useSimulations();
const dialogVisible = ref(true);
const { switchLayout } = useLayout();

const strategy = computed(() => activeStrategy?.name || "");
const simulation = computed(() => activeSimulation?.name || "");
const isSuccess = computed(() => ({
  amount:
    simulationResult.value.finalTradingAmount -
      simulationResult.value.finalHoldingAmount >
    0,
  percentage:
    simulationResult.value.finalTradingPercentage -
      simulationResult.value.finalHoldingPercentage >
    0,
}));
const onClose = () => switchLayout(LayoutType.VIEW);
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    lock-scroll
    :title="$t('simulation.simulationResults')"
    :before-close="onClose"
  >
    <i18n-t keypath="simulation.yourStartegyWasRun" tag="p" class="mb-4">
      <template #strategy>
        <strong>{{ strategy }}</strong>
      </template>
      <template #simulation>
        <strong>{{ simulation }}</strong>
      </template>
    </i18n-t>
    <el-table :data="simulationResult" class="mb-8" style="width: 100%">
      <el-table-column prop="finalTradingAmount" label="Strategy Total">
      </el-table-column>
      <el-table-column prop="finalHoldingAmount" label="Holding Total">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Result"
        width="100"
        align="center"
        header-align="center"
      >
        <el-tag
          class="text-uppercase"
          :type="isSuccess.amount ? 'success' : 'danger'"
        >
          {{ isSuccess.amount ? "win" : "loss" }}
        </el-tag>
      </el-table-column>
    </el-table>
    <el-table :data="simulationResult" class="mb-8" style="width: 100%">
      <el-table-column prop="finalTradingPercentage" label="Strategy Earns">
      </el-table-column>
      <el-table-column prop="finalHoldingPercentage" label="Holding Earns">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Result"
        width="100"
        align="center"
        header-align="center"
      >
        <el-tag
          class="text-uppercase"
          :type="isSuccess.percentage ? 'success' : 'danger'"
        >
          {{ isSuccess.percentage ? "win" : "loss" }}
        </el-tag>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
