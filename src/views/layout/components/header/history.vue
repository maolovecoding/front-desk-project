<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <SvgIcon
        name="delete"
        fillClass="fill-zinc-400"
        @click="handleDeleteAllClick"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100" />
    </div>
    <div class="flex flex-wrap">
      <div
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        v-for="(history, index) in store.histories"
        :key="history"
        @click="handleSearchClick(history)">
        <span>{{ history }}</span>
        <SvgIcon
          name="input-delete"
          @click.stop="handleDeleteClick(index)"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { SvgIcon, confirm } from "@/libs";
import { searchStore } from "@/store/pinia";
const store = searchStore();
const handleDeleteAllClick = () => {
  confirm("我是内容 哈哈哈")
    .then(() => {
      store.clear();
    })
    .catch(() => {});
};
const handleDeleteClick = (index: number) => {
  store.deleteHistory(index);
};
const emits = defineEmits<{
  (e: "searchClick", text: string): void;
}>();
const handleSearchClick = (history: string) => {
  emits("searchClick", history);
};
</script>

<style scoped></style>
