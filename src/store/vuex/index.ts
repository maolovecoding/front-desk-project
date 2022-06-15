import { IRoot } from './type';
import { createStore } from "vuex";
import getters from './getter'
import category from './modules/category'
const store = createStore<IRoot>({
  getters,
  mutations: {},
  actions: {},
  modules: {
    category
  }
});

export default store;
