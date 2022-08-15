import { createI18n } from "vue-i18n";
import storage from "./storage";
import messages from "../plugins/i18n/messages";

class Translations {
  constructor() {
    const getLanguageLocalStorage = storage.get("lng");
    this.i18n = createI18n({
      legacy: false,
      locale: getLanguageLocalStorage || this.detectLanguage(),
      fallbackLocale: "en",
      globalInjection: true,
      messages,
    });
  }

  setLanguage(lng) {
    storage.set("lng", lng);
    this.i18n.global.locale._setter(lng);
  }

  detectLanguage() {
    const browserLanguage = navigator.language.split("-")[0];
    const languageSupported = ["en", "es"].includes(browserLanguage);
    const currentLang = languageSupported ? browserLanguage : "en";

    storage.set("lng", currentLang);
    return currentLang;
  }
}

export default new Translations();
