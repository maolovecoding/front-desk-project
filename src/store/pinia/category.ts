import { ICategory } from "./../../views/main/src/components/navigation/type";
import { ALL_CATEGORY_ITEM } from "@/constants";
import { defineStore } from "pinia";
import { getCategory } from "@/api";

const category = defineStore("category", {
  state: () => ({
    categories: [ALL_CATEGORY_ITEM as ICategory]
  }),
  actions: {
    async getCategoriesAction() {
      const { categorys } = await getCategory<ICategory[]>();
      this.categories = [ALL_CATEGORY_ITEM as ICategory, ...categorys];
    }
  },
  // 那些数据需要持久化
  persist: {
    // 只开启 默认把所有状态都缓存
    enabled: true,
    // 保存所有状态 [key:"",storage:""]
    // 保存部分状态的方式
    strategies: [{ storage: localStorage, paths: ["categories"] }]
  }
});

export default category;
