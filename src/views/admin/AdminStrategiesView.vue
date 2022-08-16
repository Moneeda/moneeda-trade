<script setup>
import { useStrategies } from "~/core/useStrategies";
import { Odometer } from "@element-plus/icons-vue";
import StrategyCard from "~/components/strategies/StrategyCard.vue";
import { useRouter } from "vue-router";
import StrategyCardAdd from "~/components/strategies/StrategyCardAdd.vue";
import StrategyModal from "~/components/strategies/StrategyModal.vue";
import { ref } from "vue";

const { strategies, changeStrategy, removeStrategy } = useStrategies();
const router = useRouter();
const navigateToStrategy = (strategy) => {
  changeStrategy(strategy);
  router.push({
    name: "playground",
  });
};

const strategyModalOpen = ref(false);
const selectedStrategy = ref(undefined);


// se queda en login in....
// sigues aqui?
// estamos haciendo la migración a micro servicios
// const getInternalStrategy = (value) =>  stateInternalStrategy = value;
const updateStrategy = (value) => {
  selectedStrategy.value = value
  strategyModalOpen.value = true;
};

</script>

<template>
  <div class="py-4 px-8 max-w-[70%]">
    <h1 class="items-center">
      <el-icon :size="32"><Odometer /></el-icon>
      {{ $t("strategiesView.strategies") }}
    </h1>
    <p class="text-content">
      {{ $t("strategiesView.description") }}
    </p>
    <el-alert type="warning" :closable="false">
      {{ $t("strategiesView.warning") }}
    </el-alert>

    <span class="text-sm font-medium text-content60 uppercase block py-4">{{
      $t("strategiesView.yourStrategies")
    }}</span>
    <div class="h-full grid gap-4 grid-cols-2">
      <StrategyCard
        v-for="strategy in strategies"
        :key="strategy._id"
        :strategy="strategy"
        @click="navigateToStrategy(strategy)"
        @remove="removeStrategy(strategy)"
        @update="updateStrategy"
      />
      <StrategyCardAdd @click="strategyModalOpen = true" />
    </div>
    <StrategyModal
      v-if="strategyModalOpen"
      @close="strategyModalOpen = false"
      @create="navigateToStrategy($event)"
      :internalStrategy="selectedStrategy"
    />
  </div>
</template>

<style lang="scss" scoped></style>
