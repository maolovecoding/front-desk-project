<template>
  <div>
    <div
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-for="item in hintData"
      :key="item"
      @click="handleItemClick(item)"
      v-html="highlightText(item)">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { getSearchHint } from "@/api";
const { searchText } = defineProps<{
  searchText: string;
}>();
// 处理搜索提示数据获取
const hintData = ref<string[]>([]);
const getHintData = async () => {
  if (!searchText) return;
  const { result } = await getSearchHint(searchText);
  hintData.value = result;
};
const emits = defineEmits<{
  (e: "itemClick", item: string): void;
}>();
/**
 * 点击搜索建议的内容
 */
const handleItemClick = (item: string) => {
  emits("itemClick", item);
};
// 搜索请求 防抖处理
watchDebounced(() => searchText, getHintData, {
  debounce: 300,
  immediate: true
});
// 处理关键字高亮
const highlightText = (text: string) => {
  // 正则
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${searchText}</span>`;
  const reg = new RegExp(searchText, "gi");
  return text.replace(reg, highlightStr);
};
</script>

<style scoped></style>
