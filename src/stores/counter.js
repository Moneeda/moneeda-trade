import { defineStore } from 'pinia'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    language: undefined
  }),
  getters: {
    getLanguage: (state) => state.language
  },
  actions: {
    setLanguage(lng) {
    this.language = window.localStorage.setItem("lng", lng);
    }
  }
})
