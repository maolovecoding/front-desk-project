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
  }
});

export default category;
