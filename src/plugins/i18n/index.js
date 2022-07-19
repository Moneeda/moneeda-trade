import { createI18n } from "vue-i18n";
import messages from "./messages";

const getLanguageLocalStorage = window.localStorage.getItem("lng");

export const detectLanguage = () => {
  const browserLanguage = navigator.language.split("-")[0];
  const languageSupported = ["en", "es"].includes(browserLanguage);
  const currentLang = languageSupported ? browserLanguage : "en";

  window.localStorage.setItem("lng", currentLang);
  return currentLang;
};

export const i18n = createI18n({
  legacy: false,
  locale: getLanguageLocalStorage || detectLanguage(),
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});
