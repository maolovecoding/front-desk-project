<template>
  <div
    class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']">
      <!-- 展示箭头 -->
      <div
        @click="handleTriggerState"
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900">
        <svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fill-class="fill-zinc-900 dark:fill-zinc-300" />
      </div>
      <li
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900':
            AppStore.currentCategoryIndex === index
        }"
        v-for="(item, index) in store.categories"
        @click="handleItemClick(item)"
        :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { categoryStore, appStore } from "@/store/pinia";
import { SvgIcon } from "@/libs";
import { ICategory } from "../type";
const store = categoryStore();
const AppStore = appStore();
const isOpenCategory = ref(false); // 是否展开
const handleTriggerState = () => {
  isOpenCategory.value = !isOpenCategory.value;
};
// 选中item的切换
const handleItemClick = (category: ICategory) => {
  AppStore.changeCurrentCategory(category);
};
</script>

<style scoped></style>
