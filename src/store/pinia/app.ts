import { isMobileTerminal } from "@/utils";
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
    currentCategory: ALL_CATEGORY_ITEM as ICategory,
    // 搜索的文本
    searchText: "",
    // 路由跳转类型
    routerType: "none" as "none" | "push" | "back"
  }),
  actions: {
    changeCurrentCategory(newCategory: ICategory) {
      this.currentCategory = newCategory;
    },
    changeSearchText(text: string) {
      this.searchText = text;
    }
  },
  getters: {
    currentCategoryIndex(): number {
      return categoryStore().categories.findIndex(
        item => item.id === this.currentCategory.id
      );
    },
    routerTypeGetter(): "none" | "push" | "back" {
      if (!isMobileTerminal.value) return "none";
      return this.routerType;
    }
  }
});

export default app;
