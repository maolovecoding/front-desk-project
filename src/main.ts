import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import pinia from "@/store/pinia";
// import { vuexStore } from "@/store";
import { useREM, initTheme } from "@/utils";
import directives from "@/directives";
import "./premission";
useREM();
// 注册svg-icons 虚拟地址 是插件 vite-plugin-svg-icons 生成的虚拟地址
import "virtual:svg-icons-register";
createApp(App).use(router).use(pinia).use(directives).mount("#app");
// 初始化主题
initTheme();
