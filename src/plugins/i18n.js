import { createI18n } from "vue-i18n";
import messages from '@intlify/vite-plugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  messages: {
    en: {
      welcome: "Trading strategies are complicated.",
    },
    es: {
      welcome: "Aplicar estrategias de trading es complicado",
    },
  },
});
