<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <el-checkbox
      type="checkbox"
      :id="control.id + '-input'"
      :checked="!!control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script>
import { rankWith, isBooleanControl } from "@jsonforms/core";
import { defineComponent } from "vue";
import { useJsonFormsControl, rendererProps } from "@jsonforms/core";
import { default as ControlWrapper } from "./ControlWrapper.vue";

const controlRenderer = defineComponent({
  name: "booleanControlRenderer",
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps,
  },
  setup(props) {
    return useJsonFormsControl(props);
  },
  methods: {
    onChange(event) {
      this.handleChange(this.control.path, event.target.value);
    },
  },
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(1, isBooleanControl),
};
</script>
