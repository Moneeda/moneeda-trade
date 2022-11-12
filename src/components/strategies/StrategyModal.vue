<script setup>
import { reactive, ref, computed } from "vue";
import { productOptions, useStrategies } from "~/core/useStrategies";

const { createStrategy, updateStrategy, loading } = useStrategies();
const props = defineProps({
  internalStrategy: {
    type: Object,
  },
});
const emit = defineEmits(["update", "create", "close"]);

const close = () => {
  emit("close");
};

const isUpdate = computed(() => {
  return !!props.internalStrategy;
});

const submitForm = async (formEl) => {
  // TODO Save
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isUpdate.value) {
        const payload = { ...props.internalStrategy, ...form };
        const strategy = await updateStrategy(payload);
        emit("update", strategy._id);
      } else {
        const strategy = await createStrategy(form);
        emit("create", strategy._id);
      }
      close();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const options = [...productOptions];

const form = reactive(
  isUpdate.value
    ? {
        name: props.internalStrategy.name,
        description: props.internalStrategy.description,
        product: props.internalStrategy.product,
        baseCurrencyAmount: props.internalStrategy.baseCurrencyAmount,
        quoteCurrencyAmount: props.internalStrategy.quoteCurrencyAmount,
      }
    : {
        name: "",
        description: "",
        product: "",
        baseCurrencyAmount: 1,
        quoteCurrencyAmount: 1,
      }
);

const strategyFormRef = ref();

const rules = {
  name: { required: true, message: "Please add a name" },
  product: { required: true, message: "Please select a product" },
  baseCurrencyAmount: { required: true, message: "Please select a product" },
  quoteCurrencyAmount: { required: true, message: "Please select a product" },
};
</script>

<template>
  <el-dialog
    :model-value="true"
    :show-close="false"
    :before-close="close"
    :title="
      isUpdate
        ? $t('strategiesView.strategyModal.updateTitle')
        : $t('strategiesView.strategyModal.createTitle')
    "
  >
    <p>
      {{ $t("strategiesView.strategyModal.description") }}
    </p>
    <el-form
      :model="form"
      label-width="200px"
      label-position="left"
      ref="strategyFormRef"
      :rules="rules"
      status-icon
    >
      <el-form-item
        :label="$t('strategiesView.strategyModal.name')"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        :label="$t('strategiesView.strategyModal.inputDescription')"
        prop="description"
      >
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item
        :label="$t('strategiesView.strategyModal.product')"
        prop="product"
      >
        <el-select
          v-model="form.product"
          placeholder="$t('strategiesView.strategyModal.productSelect')"
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
      <el-form-item
        :label="$t('strategiesView.strategyModal.baseAmount')"
        prop="baseCurrencyAmount"
      >
        <el-input-number
          v-model="form.baseCurrencyAmount"
          :precision="5"
          :step="0.00001"
        />
      </el-form-item>
      <el-form-item
        :label="$t('strategiesView.strategyModal.quoteAmount')"
        prop="quoteCurrencyAmount"
      >
        <el-input-number
          v-model="form.quoteCurrencyAmount"
          :precision="5"
          :step="0.00001"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">{{
          $t("strategiesView.strategyModal.cancelCTA")
        }}</el-button>
        <el-button
          type="primary"
          @click="submitForm(strategyFormRef)"
          :loading="loading.create"
          >{{ $t("strategiesView.strategyModal.confirmCTA") }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
