<template>
  <div>
    <Infinite
      v-model="isLoading"
      :is-finished="isFinished"
      @onLoad="getPexelsListData">
      <WaterFall
        class="px-1 w-full"
        :data="pexelsList"
        node-key="id"
        :column="isMobileTerminal ? 2 : 5"
        :picture-pre-reading="false">
        <template #default="{ item, width }">
          <Item :item="item" :width="width"></Item>
        </template>
      </WaterFall>
    </Infinite>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPexelsList, IPexelsList } from "@/api";
import Item from "./item.vue";
import { WaterFall, Infinite } from "@/libs";
import { isMobileTerminal } from "@/utils";
/**
 * 构建数据请求
 */
const query = {
  page: 1,
  size: 20
};
// 数据源
const pexelsList = ref<IPexelsList[]>([]);
// 数据正在加载中
const isLoading = ref(false);
// 数据是否全部加载完成
const isFinished = ref(false);
// 处理加载数据的方法
const getPexelsListData = async () => {
  // 没有更多数据了
  if (isFinished.value) return;
  // 完成了第一次请求之后 后续的请求让page增加
  if (pexelsList.value.length) {
    query.page += 1;
  }
  const res = await getPexelsList(query);
  // 第一次获取数据
  if (query.page === 1) pexelsList.value = res.list;
  else {
    // 加载更多数据
    pexelsList.value.push(...res.list);
  }
  // 没有更多数据
  if (pexelsList.value.length === res.total) {
    isFinished.value = true;
  }
  // 修改loading标识 当前请求完毕
  isLoading.value = false;
};
</script>

<style scoped></style>
