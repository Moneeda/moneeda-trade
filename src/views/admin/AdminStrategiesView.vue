<script setup>
import { useStrategies } from "~/core/useStrategies";
import { Odometer } from "@element-plus/icons-vue";
import StrategyCard from "~/components/strategies/StrategyCard.vue";
import { useRouter } from "vue-router";
import StrategyCardAdd from "~/components/strategies/StrategyCardAdd.vue";

const { strategies, changeStrategy } = useStrategies();
const router = useRouter();
const navigateToStrategy = (strategy) => {
  changeStrategy(strategy);
  router.push({
    name: "playground",
  });
};
</script>

<template>
  <div class="py-4 px-8 max-w-[70%]">
    <h1 class="items-center">
      <el-icon :size="32"><Odometer /></el-icon> Strategies
    </h1>
    <p class="text-content">
      Strategies are a set of conditions that are going to define how your bot
      behaves. Each strategy is linked to a specific pair (ex: BTC-USD) and a
      specific simulation data (ex: Last week data).
    </p>
    <el-alert type="warning" :closable="false">
      If a strategy is live, your token consumption will be affected
      accordingly. Simulate the results first to see the impact.
    </el-alert>

    <span class="text-sm font-medium text-content60 uppercase block py-4"
      >Your strategies</span
    >
    <div class="h-full grid gap-4 grid-cols-2">
      <StrategyCard
        v-for="strategy in strategies"
        :key="strategy._id"
        :strategy="strategy"
        @click="navigateToStrategy(strategy)"
      />
      <StrategyCardAdd />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
