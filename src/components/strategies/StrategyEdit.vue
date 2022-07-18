<script setup>
import { useLayout } from "~/core/useLayout";
import { useStrategies } from "~/core/useStrategies";
import { Expand } from "@element-plus/icons-vue";
import { computed, reactive } from "vue";
import { JsonForms } from "@jsonforms/vue";
import {
  vanillaRenderers,
  mergeStyles,
  defaultStyles,
} from "@jsonforms/vue-vanilla";
import { entry as BooleanRenderer } from "../jsonforms/BooleanControlRenderer.vue";

const { layoutMode, switchLayout } = useLayout();
const { resources } = useStrategies();

const resourceType = computed(() => layoutMode.value);
const jsonResource = computed(() => {
  return resources.value[resourceType.value];
});
const data = reactive({});

const renderers = Object.freeze([...vanillaRenderers, BooleanRenderer]);
</script>

<script>
// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, {
  control: { label: "mylabel", select: "el-select", input: "el" },
});

export default {
  provide: {
    styles: myStyles,
  },
};
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
