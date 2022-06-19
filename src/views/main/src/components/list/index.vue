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
          <Item @click="handleToPinsClick" :item="item" :width="width"></Item>
        </template>
      </WaterFall>
    </Infinite>

    <!-- 图片详情 内容展示 -->
    <transition
      :css="false"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @leave="handleLeave">
      <Pins v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import gsap from "gsap";
import { getPexelsList, IPexelsList, IParams } from "@/api";
import Item from "./item.vue";
import { WaterFall, Infinite } from "@/libs";
import { isMobileTerminal } from "@/utils";
import { appStore } from "@/store/pinia";
import Pins from "@/views/pins/components/pins.vue";
const store = appStore();
/**
 * 构建数据请求
 */
let query = {
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
/**
 * 通过此方法修改 query对象 重新发起请求
 * @param newQuery
 */
const resetQuery = (newQuery: UnRequired<IParams>) => {
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelsList.value = [];
};

const handleToPinsClick = (data: any) => {
  history.pushState(null, "", `/pins/${data.id}`);
  isVisiblePins.value = true;
  currentPins.value = data;
  console.log(data);
};
// 控制pins的展示
const isVisiblePins = ref(false);
// 当前选中的item项的所需数据
const currentPins = ref<any>();
const handleBeforeEnter = (el: HTMLDivElement) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: "0 0",
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  });
};
const handleEnter = (el: HTMLDivElement, done: () => void) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    duration: 0.4,
    translateX: 0,
    translateY: 0,
    // 完成的回调
    onComplete: done
  });
};
const handleLeave = (el: HTMLDivElement, done: () => void) => {
    gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    duration: 0.4,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  });
};
window.addEventListener("popstate",()=>{
  isVisiblePins.value = false
})
/**
 * 监听选中项的改变
 */
watch(
  () => store.currentCategory,
  currentCategory => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    });
  }
);
// 监听 当前搜索文本的变化
watch(
  () => store.searchText,
  newSearchText => {
    resetQuery({
      page: 1,
      searchText: newSearchText
    });
  }
);
type UnRequired<T> = {
  [key in keyof T]?: T[key];
};
</script>

<style scoped></style>
