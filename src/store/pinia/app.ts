import { ICategory } from "./../../views/main/src/components/navigation/type";
import { ALL_CATEGORY_ITEM } from "@/constants";
import { defineStore } from "pinia";
import categoryStore from "./category";
/**
 * app模块数据不需要缓存
 */
const app = defineStore("app", {
  state: () => ({
    // 当前选中分类
    currentCategory: ALL_CATEGORY_ITEM as ICategory
  }),
  actions: {
    changeCurrentCategory(newCategory: ICategory) {
      this.currentCategory = newCategory;
    }
  },
  getters: {
    currentCategoryIndex(): number {
      return categoryStore().categories.findIndex(
        item => item.id === this.currentCategory.id
      );
    }
  }
});

export default app;
