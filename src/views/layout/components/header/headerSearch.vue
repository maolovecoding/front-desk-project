<template>
  <div class="w-full">
    <Search v-model="inputValue" @search="handleSearchClick">
      <template #dropdown>
        <!-- 搜索提示 -->
        <Hint
          v-show="inputValue"
          :search-text="inputValue"
          @item-click="handleSearchClick" />
        <!-- 最近搜索 -->
        <History v-show="!inputValue" @search-click="handleSearchClick" />
      </template>
    </Search>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@/libs";
import Hint from "./hint.vue";
import History from "./history.vue";
import { searchStore } from "@/store/pinia";
const store = searchStore();
const inputValue = ref("");
const handleSearchClick = (item: string) => {
  inputValue.value = item;
  item && store.insertHistory(item);
};
</script>
