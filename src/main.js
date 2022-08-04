import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import { i18n } from "./plugins/i18n";

import "./assets/styles/global.scss";
import "./assets/styles/tailwind.css";
import "./assets/styles/element.scss";

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
