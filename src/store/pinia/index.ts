import { defineStore, createPinia } from "pinia";
import PiniaPluginPersist from "pinia-plugin-persist";
import categoryStore from "./category";
import themeStore from "./theme";
import appStore from "./app";
import searchStore from "./search";
import userStore from "./user";
const store = defineStore("main", {
  state: () => ({}),
  getters: {},
  actions: {}
});
const pinia = createPinia();
// 持久化插件
pinia.use(PiniaPluginPersist);

export default pinia;

export { categoryStore, themeStore, appStore, searchStore, userStore };

export const useStore = (id: "search" | "category" | "app" | "theme") => {
  switch (id) {
    case "category":
      return categoryStore();
    case "search":
      return searchStore();
    case "app":
      return appStore();
    case "theme":
      return themeStore();
  }
};
