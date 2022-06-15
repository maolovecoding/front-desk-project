<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <li
        ref="sliderRef"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"></li>
      <li
        @click="handlePopupShow"
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc">
        <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
      </li>
      <li
        v-for="(category, index) in store.categories"
        @click="handleItemClick(index)"
        :ref="setItemRefs"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currCategoryIndex === index }"
        :key="category.id">
        {{ category.name }}
      </li>
    </ul>
    <!-- 弹出层 -->
    <Popup :model-value="false" v-model="isVisible">
      <Menu @on-item-click="handleItemClick" />
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, ref, watch } from "vue";
import { useScroll } from "@vueuse/core";
import { categoryStore } from "@/store/pinia";
import { SvgIcon, Popup } from "@/libs";
import Menu from "../../menu/index.vue";
const store = categoryStore()
// 滑块
const sliderRef = ref();
// 滑块默认样式
const sliderStyle = ref({
  transform: "translateX(0px)",
  width: "52px"
});
// 获取ul
const ulRef = ref<HTMLUListElement>();
// 选中的item项的下标
const currCategoryIndex = ref(0);
// 获取所有的 item 元素
const itemRefs: HTMLLIElement[] = [];
const setItemRefs = (el: any) => {
  if (el) itemRefs.push(el);
};
// 通过 vueuse -》 vueScroll 获取响应式的 scroll 滚动距离 横向滚动偏离位置
const { x: ulScrollLeft } = useScroll(ulRef);
const handleItemClick = (index: number) => {
  currCategoryIndex.value = index;
};
// 控制popup蒙版的显示和隐藏
const isVisible = ref(false);
const handlePopupShow = () => {
  isVisible.value = true;
};
// 数据发生改变 DOM更新之前执行该回调
onBeforeUpdate(() => {
  // 重置ref选项
  itemRefs.length = 0;
});
// 在选中的 item发生改变时 更新当前的滑块样式
watch(currCategoryIndex, newIndex => {
  const { left, width } = itemRefs[newIndex].getBoundingClientRect();
  console.log(left, ulRef.value?.scrollLeft);
  sliderStyle.value = {
    // 滑块横向移动的距离 =  ul混动的位置 + 当前元素的left - ul的padding
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    // 滑块的宽度
    width: `${width}px`
  };
  // 滑块滚动条的位置再外面点击弹出层上的item项时 混动条跟着滑动
  if (isVisible.value) {
    isVisible.value = false;
    ulRef.value!.scrollLeft += left - 10;
  }
});
</script>
