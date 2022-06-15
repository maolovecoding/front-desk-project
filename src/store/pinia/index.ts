import { defineStore } from "pinia";
import categoryStore from "./category";
const store = defineStore("main", {
  state: () => ({}),
  getters: {},
  actions: {}
});

export default store();

export { categoryStore };
