import { createI18n } from "vue-i18n";
import storage from "~/services/storage";
import messages from "./messages";

const getLanguageLocalStorage = storage.get("lng");

export const detectLanguage = () => {
  const browserLanguage = navigator.language.split("-")[0];
  const languageSupported = ["en", "es"].includes(browserLanguage);
  const currentLang = languageSupported ? browserLanguage : "en";

  storage.set("lng", currentLang);
  return currentLang;
};

export const i18n = createI18n({
  legacy: false,
  locale: getLanguageLocalStorage || detectLanguage(),
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});
