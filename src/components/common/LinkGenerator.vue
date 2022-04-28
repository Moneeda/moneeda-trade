<script>
import {
  defineComponent,
  watch,
  onMounted,
  ref,
  computed,
  nextTick,
} from "vue";
import CurrencyList from "currency-list";
import api from "@/api";

import CurrencyInput from "@/components/common/CurrencyInput";
import { useIntegrations } from "~/core/useIntegrations";
import { useApplications } from "~/core/useApplications";

const SHOWCASE_PROVIDERS = [
  { _id: 1, name: "Stripe", value: "STRIPE", disabled: false },
  { _id: 2, name: "Square", value: "SQUARE", disabled: false },
  // { _id: 6, name: 'Ethereum', value: 'ETHEREUM', disabled: false },
  { _id: 3, name: "Mollie", value: "MOLLIE", disabled: true },
  { _id: 4, name: "Checkout", value: "CHECKOUT", disabled: true },
  { _id: 5, name: "Klarna", value: "KLARNA", disabled: true },
];

const CURRENCIES = CurrencyList.getAll("en_US");
CURRENCIES.ETH = {
  code: "ETH",
  decimal_digits: 5,
  name: "Ethereum (cryptos)",
  name_plural: "Ethereums",
  rounding: 0,
  symbol: "ETH",
};

const DEFAULT_AMOUNT = 1000;

export default defineComponent({
  components: {
    CurrencyInput,
  },
  props: {
    showcase: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const loading = ref(false);
    const amount = ref(DEFAULT_AMOUNT);
    const link = ref("");
    const currency = ref("EUR");
    const itemName = ref("");
    const itemImage = ref("");
    const provider = ref({});
    const { integrations } = useIntegrations(props.showcase);
    const { activeApplication } = useApplications(props.showcase);
    const currencies = Object.values(CURRENCIES).sort((a, b) =>
      a.name > b.name ? 1 : -1
    );

    const providers = computed(() => {
      if (props.showcase) {
        return SHOWCASE_PROVIDERS;
      }

      return SHOWCASE_PROVIDERS.map((p) => ({
        ...p,
        disabled: !integrations.value.some((i) => i.provider === p.value),
      }));
    });

    const currencyOptions = computed(() => {
      return {
        locale: "en",
        currency: currency.value,
        precision: CURRENCIES[currency.value]?.decimal_digits || 2,
        autoDecimalDigits: false,
        provider: provider.value,
        hideCurrencySymbolOnFocus: false,
        exportValueAsInteger: true,
        valueRange: { min: isCrypto.value ? 0.0001 : 1 },
        allowNegative: false,
      };
    });

    const defaultProvider = computed(() => {
      if (integrations.value.length > 0) {
        return integrations.value[0].provider;
      }
      return "STRIPE";
    });

    const isCrypto = computed(() => {
      return currency.value === "ETH";
    });

    const apiKey = computed(
      () => activeApplication.value?.apiKey || "NO_API_KEY_GENERATED"
    );

    onMounted(async () => {
      await nextTick();
      provider.value = defaultProvider.value;
    });

    const logoUrl = (provider) => {
      return require(`@/assets/img/services/${provider.value?.toLowerCase()}.png`);
    };

    const resetAmount = async () => {
      await nextTick();
      amount.value = DEFAULT_AMOUNT;
    };

    watch(amount, () => {
      ctx.emit("change");
    });

    watch(provider, (newProvider, oldProvider) => {
      ctx.emit("change");
      if (newProvider === "ETHEREUM") {
        currency.value = "ETH";
        resetAmount();
        return;
      }

      if (oldProvider === "ETHEREUM" && newProvider !== "ETHEREUM") {
        currency.value = "EUR";
        resetAmount();
      }
    });

    watch(currency, (newCurrency, oldCurrency) => {
      ctx.emit("change");
      if (newCurrency === "ETH") {
        provider.value = "ETHEREUM";
        resetAmount();
        return;
      }

      if (oldCurrency === "ETH" && newCurrency !== "ETH") {
        provider.value = defaultProvider.value;
        resetAmount();
      }
    });

    const generate = async () => {
      // // We want crypto amount as a string
      const _amount = isCrypto.value
        ? amount.value / 100000 + ""
        : amount.value;

      if (props.showcase) {
        try {
          loading.value = true;
          link.value = await api.internal().test({
            amount: _amount,
            currency: currency.value,
            provider: provider.value,
            itemName: itemName.value,
            itemImage: itemImage.value,
          });
          ctx.emit("generate", link.value);
        } catch (e) {
          console.error(e);
        } finally {
          loading.value = false;
        }
      } else {
        link.value = `  
        https://moneeda.com/checkout?apiKey=${apiKey.value}&provider=${provider.value}&itemName=${itemName.value}&itemAmount=${_amount}&itemCurrency=${currency.value}&itemImage=${itemImage.value}
        `;
        ctx.emit("generate", link.value);
      }
    };

    return {
      currencyOptions,
      isCrypto,
      amount,
      currency,
      provider,
      providers,
      generate,
      loading,
      logoUrl,
      itemName,
      itemImage,
      currencies,
    };
  },
});
</script>

<template>
  <div class="card max-w-[400px] w-full">
    <h2 class="font-title">Payment link generator</h2>

    <label for="amount" class="block">Amount</label>
    <currency-input v-model="amount" :options="currencyOptions" class="!mb-3" />

    <label for="currency" class="block">Currency</label>
    <el-select
      id="currency"
      v-model="currency"
      prefix-icon="el-icon-link"
      filterable
      class="w-full mb-3"
      name="currency"
    >
      <el-option
        v-for="currency in currencies"
        :key="currency.code"
        :label="currency.name"
        :value="currency.code"
      ></el-option>
    </el-select>

    <label for="provider" class="block">Provider</label>
    <div class="flex flex-wrap">
      <div
        v-for="prov in providers"
        :key="prov._id"
        class="
          border border-border
          rounded
          shadow-sm
          px-2
          py-4
          w-[80px]
          cursor-pointer
          hover:bg-whitehover
          mr-3
          mb-3
          gap-4
        "
        :class="{
          '!border-lighthighlight !bg-lighthighlight': prov.value === provider,
          'provider-logo--disabled': prov.disabled,
        }"
        @click="provider = prov.value"
      >
        <el-tooltip
          class="item"
          :content="showcase ? 'Soon!' : 'Not configured'"
          :disabled="!prov.disabled"
          placement="top-start"
          effect="light"
        >
          <div
            :style="{ backgroundImage: `url(${logoUrl(prov)})` }"
            :alt="prov.name"
            class="provider-logo"
          />
        </el-tooltip>

        <div class="text-xs w-full text-center">
          {{ prov.name }}
        </div>
      </div>
    </div>

    <label for="itemName" class="block">Item name</label>
    <el-input
      id="itemName"
      v-model="itemName"
      type="text"
      prefix-icon="el-icon-box"
      placeholder="An amazing T-shirt"
      class="!mb-3"
    />

    <label for="itemImage" class="block">Item name</label>
    <el-input
      id="itemImage"
      v-model="itemImage"
      prefix-icon="el-icon-link"
      type="text"
      placeholder="Your image url"
      class="!mb-3"
    >
      <el-popover slot="append" trigger="hover">
        <img :src="itemImage" alt="item image" class="w-full h-full" />
        <div
          slot="reference"
          class="bg-cover bg-no-repeat bg-center h-[20px] w-[20px]"
          :style="`background-image: url(${itemImage})`"
        />
      </el-popover>
    </el-input>

    <el-button
      type="primary"
      class="!mt-4 w-full"
      :loading="loading"
      @click="generate"
    >
      Generate a payment link</el-button
    >
  </div>
</template>

<style lang="scss" scoped>
.provider-logo {
  height: 30px;
  width: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
