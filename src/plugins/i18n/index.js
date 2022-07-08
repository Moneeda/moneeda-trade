import { createI18n } from "vue-i18n";
import messages from "./messages";
// import { i18n } from "~/plugins/i18n";


const getLanguageLocalStorage = window.localStorage.getItem('lng')

export const i18n = createI18n({
  legacy: false,
  locale: getLanguageLocalStorage || 'en',
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

export const setLanguage = (lng) => {
  window.localStorage.setItem("lng", lng);
  i18n.global.locale._setter(lng);
};
