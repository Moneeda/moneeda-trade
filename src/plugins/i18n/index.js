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


export const detectLanguage = () => {
  const browserLanguage = navigator.language.split("-")[0];
  const languageSupported = ["en", "es"].includes(browserLanguage);
  const currentLang = languageSupported ? browserLanguage : "en";

  if(currentLang){
    window.localStorage.setItem("lng", currentLang);
    i18n.global.locale._setter(currentLang);
    window.localStorage.setItem("mount", 'on');
  }
}
