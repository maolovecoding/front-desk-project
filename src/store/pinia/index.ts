import { defineStore, createPinia } from "pinia";
import PiniaPluginPersist from "pinia-plugin-persist";
import categoryStore from "./category";
import themeStore from "./theme";
const store = defineStore("main", {
  state: () => ({}),
  getters: {},
  actions: {}
});
const pinia = createPinia();
// 持久化插件
pinia.use(PiniaPluginPersist);

export default pinia;

export { categoryStore, themeStore };
