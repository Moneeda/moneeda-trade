import { createI18n } from "vue-i18n";
import messages from "./messages";

const getLanguageLocalStorage = window.localStorage.getItem('lng')

export const i18n = createI18n({
  legacy: false,
  locale: getLanguageLocalStorage || 'en',
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});
