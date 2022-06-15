import { defineComponent, ref } from "vue";
import { isMobileTerminal } from "@/utils";
import Mobile from "./mobile/index.vue";
import { categoryStore } from "@/store/pinia";
import PC from "./pc/index.vue";
export default defineComponent({
  setup() {
    const store = categoryStore();
    // 发起请求 获取 categories数据
    store.getCategoriesAction();
    return () => {
      return <div>{isMobileTerminal.value ? <Mobile /> : <PC />}</div>;
    };
  }
});
