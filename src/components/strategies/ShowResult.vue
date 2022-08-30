<script setup>
import { useStrategies } from "~/core/useStrategies";

const { simulationResult } = useStrategies();
</script>
<template>
  <el-table :data="simulationResult" class="mb-8" style="width: 100%">
    <el-table-column
      prop="finalTradingAmount"
      label="Strategy Total"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="finalHoldingAmount"
      label="Holding Total"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      filter-placement="bottom-end"
    >
      <template v-slot="scope">
        <el-result
          style="padding: 0; transform: scale(0.4)"
          :icon="
            scope.row.finalTradingAmount - scope.row.finalHoldingAmount > 0
              ? 'success'
              : 'error'
          "
        />
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="simulationResult" class="mb-8" style="width: 100%">
    <el-table-column
      prop="finalTradingPercentage"
      label="Strategy Earns"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="finalHoldingPercentage"
      label="Holding Earns"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      filter-placement="bottom-end"
    >
      <template v-slot="scope">
        <el-result
          style="padding: 0; transform: scale(0.4)"
          :icon="
            scope.row.finalTradingPercentage -
              scope.row.finalHoldingPercentage >
            0
              ? 'success'
              : 'error'
          "
        />
      </template>
    </el-table-column>
  </el-table>
</template>
