import { defineStore } from 'pinia'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    language: 'en'
  }),
  getters: {
    currentLanguage: (state) => state.language
  },
  actions: {
    setLanguage(lng) {
    this.language = lng;
    window.localStorage.setItem('lng', lng);
    }
  }
})
