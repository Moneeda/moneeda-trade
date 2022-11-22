<script setup>
import { useStrategies } from "~/core/useStrategies";
import { Odometer } from "@element-plus/icons-vue";
import StrategyCard from "~/components/strategies/StrategyCard.vue";
import { useRouter } from "vue-router";
import StrategyCardAdd from "~/components/strategies/StrategyCardAdd.vue";
import StrategyModal from "~/components/strategies/StrategyModal.vue";
import { ref } from "vue";

const { retrieveStrategies, strategies, changeStrategy, removeStrategy } =
  useStrategies();
const router = useRouter();
retrieveStrategies();
const navigateToStrategy = (strategy) => {
  changeStrategy(strategy._id);
  router.push({
    name: "playground",
    params: {
      id: strategy._id,
    },
  });
};

const strategyModalOpen = ref(false);
const selectedStrategy = ref(undefined);

const updateStrategy = (value) => {
  selectedStrategy.value = value;
  strategyModalOpen.value = true;
};

const createStrategy = (value) => {
  selectedStrategy.value = {
    ...value,
    _id: undefined,
    name: `Copy - ${value.name}`,
    sourceId: value._id,
  };
  strategyModalOpen.value = true;
};

const onCloseModal = () => {
  selectedStrategy.value = undefined;
  strategyModalOpen.value = false;
};
</script>

<template>
  <div class="py-4 px-8 max-w-[70%]">
    <h1 class="flex items-center text-2xl my-6">
      <el-icon :size="32" class="mr-4">
        <Odometer />
      </el-icon>
      {{ $t("strategiesView.strategies") }}
    </h1>
    <p class="text-content mb-4">
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
        @create="createStrategy"
      />
      <StrategyCardAdd @click="strategyModalOpen = true" />
    </div>
    <StrategyModal
      v-if="strategyModalOpen"
      @close="onCloseModal"
      @create="onCloseModal"
      @update="onCloseModal"
      :internalStrategy="selectedStrategy"
    />
  </div>
</template>

<style lang="scss" scoped></style>
