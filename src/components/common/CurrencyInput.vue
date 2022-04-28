<script>
import { defineComponent, watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { inputRef, setValue, setOptions } = useCurrencyInput(props.options);

    watch(
      () => props.value,
      (val) => {
        setValue(val);
      }
    );

    watch(
      () => props.options,
      (options) => {
        setOptions(options);
      }
    );

    return { inputRef };
  },
});
</script>

<template>
  <div class="el-input el-input--prefix">
    <input
      ref="inputRef"
      class="el-input__inner"
      type="text"
      placeholder="Enter an amount"
    />
    <span class="el-input__prefix">
      <i class="el-input__icon el-icon-coin"> </i>
    </span>
  </div>
</template>
