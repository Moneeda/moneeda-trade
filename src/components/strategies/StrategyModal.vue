<script setup>
import { reactive, ref } from "vue";
import { productOptions, useStrategies } from "~/core/useStrategies";

const { createStrategy, loading } = useStrategies();

const emit = defineEmits(["create", "close"]);

const close = () => {
  emit("close");
};

const submitForm = async (formEl) => {
  // TODO Save
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const strategy = await createStrategy(form);
      emit("create", strategy._id);
      close();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const options = [...productOptions];

const form = reactive({
  name: strategy.name || "",
  description: strategy.description || "",
  product: strategy.product || "",
  baseCurrencyAmount: strategy.baseCurrencyAmount || 1,
  quoteCurrencyAmount: strategy.quoteCurrencyAmount || 1,
});

const strategyFormRef = ref();

const rules = {
  name: { required: true, message: "Please add a name" },
  product: { required: true, message: "Please select a product" },
  baseCurrencyAmount: { required: true, message: "Please select a product" },
  quoteCurrencyAmount: { required: true, message: "Please select a product" },
};

const props = defineProps({
  strategy: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <el-dialog
    :model-value="true"
    :show-close="false"
    :before-close="close"
    title="Add strategy"
  >
    <p>
      Create a new strategy for a specific product with a base amount and a
      quote amount. Conditions and actions will be defined in the next step.
    </p>
    <el-form
      :model="form"
      label-width="200px"
      label-position="left"
      ref="strategyFormRef"
      :rules="rules"
      status-icon
    >
      <el-form-item label="Strategy name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Strategy description" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="Product" prop="product">
        <el-select
          v-model="form.product"
          placeholder="Please select a product"
          class="w-full"
        >
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Base amount" prop="baseCurrencyAmount">
        <el-input-number
          v-model="form.baseCurrencyAmount"
          :precision="5"
          :step="0.00001"
        />
      </el-form-item>
      <el-form-item label="Quote amount" prop="quoteCurrencyAmount">
        <el-input-number
          v-model="form.quoteCurrencyAmount"
          :precision="5"
          :step="0.00001"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button
          type="primary"
          @click="submitForm(strategyFormRef)"
          :loading="loading.create"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
