<script setup>
import { useLayout } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { Expand } from "@element-plus/icons-vue";
import { computed, reactive } from "vue";
import { JsonForms } from "@jsonforms/vue";
import { vanillaRenderers } from "@jsonforms/vue-vanilla";

const { layoutMode, switchLayout } = useLayout();
const { resources } = useStrategies();

const resourceType = computed(() => layoutMode.value);
const jsonResource = computed(() => {
  return resources.value[resourceType.value];
});
const data = reactive({});

const renderers = Object.freeze([
  ...vanillaRenderers,
  // here you can add custom renderers
]);
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h2>Details</h2>
      <el-button :icon="Expand" @click="switchLayout('view')" disabled>
      </el-button>
    </div>

    <json-forms
      v-if="jsonResource"
      :data="data"
      :renderers="renderers"
      :schema="jsonResource.schema"
      :uischema="jsonResource.uischema"
    />
  </div>
</template>
