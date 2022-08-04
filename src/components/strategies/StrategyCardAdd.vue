<script setup>
import { DocumentAdd } from "@element-plus/icons-vue";
</script>

<template>
  <div>
    <div class="strategy-card">
      <div class="flex flex-col items-center">
        <el-icon :size="24">
          <component :is="DocumentAdd" />
        </el-icon>
        <el-tag type="success" class="mt-2">{{
          $t("strategiesView.cardIcon")
        }}</el-tag>
      </div>

      <div class="flex-1 items-center">
        <h4 class="font-medium">{{ $t("strategiesView.cardTittle") }}</h4>
      </div>
      <div class="flex-[0 0 80px]"></div>
    </div>
  </div>
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
  min-height: 90px;
  color: var(--color-content-60);
  border: 1px dashed rgba(grey, 0.5);
  opacity: 0.7;

  &:hover {
    @apply shadow-xl;
    background-color: white;
    opacity: 1;
  }
}
</style>
