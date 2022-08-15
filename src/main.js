import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import translations from '../src/services/translations';

import "./assets/styles/global.scss";
import "./assets/styles/tailwind.css";
import "./assets/styles/element.scss";

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(translations.i18n);
app.mount("#app");
