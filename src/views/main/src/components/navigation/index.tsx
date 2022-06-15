import { defineComponent, ref } from "vue";
import { isMobileTerminal } from "@/utils";
import Mobile from "./mobile/index.vue";
import { getCategory } from "@/api";
import { categoryStore } from "@/store/pinia";
import type { ICategory } from "./type";
import { ALL_CATEGORY_ITEM } from "@/constants";
// import PC from "./pc";
export default defineComponent({
  setup() {
    // const categories = ref<ICategory[]>([]);
    const store = categoryStore();
    // 发起请求 获取 categories数据
    store.getCategoriesAction();
    // const getCategoryData = async () => {
    //   const { categorys } = await getCategory<{ categorys: ICategory[] }>();
    //   categorys.unshift(ALL_CATEGORY_ITEM as ICategory);
    //   categories.value = categorys;
    // };
    // getCategoryData();
    return () => {
      return (
        <div>
          {isMobileTerminal.value ? (
            <Mobile />
          ) : null}
        </div>
      );
    };
  }
});
