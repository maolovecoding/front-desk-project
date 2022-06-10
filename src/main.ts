import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import { createPinia } from "pinia";
import { vuexStore } from "@/store";
createApp(App).use(router).use(vuexStore).use(createPinia()).mount("#app");
