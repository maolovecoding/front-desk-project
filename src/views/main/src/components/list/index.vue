<template>
  <div>
    <WaterFall
      :data="pexelsList"
      node-key="id"
      :column="5"
      :picture-pre-reading="true">
      <template #default="{ item, width, index }">
        <Item :item="item"></Item>
      </template>
    </WaterFall>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPexelsList, IPexelsList } from "@/api";
import Item from "./item.vue";
import { WaterFall } from "@/libs";
/**
 * 构建数据请求
 */
const query = {
  page: 1,
  size: 20
};
const pexelsList = ref<IPexelsList[]>([]);
const getPexelsListData = async () => {
  const res = await getPexelsList(query);
  console.log(res);
  pexelsList.value = res.list;
};
getPexelsListData();
</script>

<style scoped></style>
