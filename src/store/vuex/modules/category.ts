import { getCategory } from "@/api";
import { ALL_CATEGORY_ITEM } from "@/constants";
import { ICategory } from "@/views/main/src/components/navigation/type";
import { Module } from "vuex";
import { ICategoryState, IRootState } from "../type";
const category: Module<ICategoryState, IRootState> = {
  namespaced: true,
  state: () => ({
    categories: []
  }),
  mutations: {
    setCategories(state, payload: ICategory[]) {
      state.categories = [ALL_CATEGORY_ITEM as ICategory, ...payload];
    }
  },
  actions: {
    async useCategories({ commit }) {
      const categories = await getCategory<ICategory[]>();
      commit("setCategories", categories);
    }
  }
};
export default category;
