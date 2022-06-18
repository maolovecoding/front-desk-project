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
        <!-- /推荐主题 -->
        <Theme />
      </template>
    </Search>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@/libs";
import Hint from "./hint.vue";
import History from "./history.vue";
import Theme from "./theme.vue";
import { searchStore, appStore } from "@/store/pinia";
const store = searchStore();
const inputValue = ref("");
const handleSearchClick = (item: string) => {
  inputValue.value = item;
  if (item) {
    store.insertHistory(item);
    //  修改当前搜索文本
    appStore().changeSearchText(item);
  }
};

</script>
