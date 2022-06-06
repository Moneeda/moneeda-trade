<script setup>
import { DocumentAdd } from "@element-plus/icons-vue";
import StrategyModal from "./StrategyModal.vue";
import { ref } from "vue";

const isOpen = ref(false);

</script>

<template>
  <div class="strategy-card">
    <div class="flex flex-col items-center" >
       <el-button :icon="DocumentAdd" :size="24" @click="isOpen = true"></el-button>
    </div>

    <div class="flex-1">
      <h4 class="font-medium">Add a new strategy</h4>
    </div>
    <div class="flex-[0 0 80px]"></div>
  </div>
  <component :is="StrategyModal" :open="isOpen" @close= "isOpen = !isOpen" />
</template>

<style lang="scss" scoped>
.strategy-card {
  display: flex;
  background-color: rgba(white, 0.8);
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  gap: 12px;
  min-height: 60px;
  color: theme("colors.content60");
  border: 1px dashed rgba(grey, 0.5);

  &:hover {
    @apply shadow-xl;
    background-color: white;
  }
}
</style>
