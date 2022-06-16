<template>
  <div>
    <!-- 内容 -->
    <slot />
    <!-- loading -->
    <div class="h-6 py-4" ref="loadingRef">
      <!-- 加载更多 -->
      <SvgIcon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"></SvgIcon>
      <!-- 没有更多数据 -->
      <p v-if="props.isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了！
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { useVModel, useIntersectionObserver } from "@vueuse/core";
import { SvgIcon } from "@/libs";
const props = defineProps<{
  // 是否处于加载状态
  modelValue: boolean;
  // 数据是否全部加载完成
  isFinished: boolean;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  // 正在加载
  (e: "onLoad"): void;
}>();
// 处理加载状态
const loading = useVModel(props);
const loadingRef = ref<HTMLDivElement>();
// 当前是否在底部 是否可见
const isIntersectingRef = ref<boolean>();
// 监听loading是否可见
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  isIntersectingRef.value = isIntersecting;
  emitLoad();
});
/**
 * 触发 load 事件
 */
const emitLoad = () => {
  // 放置首屏请求图片已经铺满，额外发起一个请求
  setTimeout(() => {
    // 当加载更多的视图可见时 且没有正在加载数据 数据也没加载完（还有数据可加载） 处理加载更多的逻辑
    if (isIntersectingRef.value && !loading.value && !props.isFinished) {
      // 元素可见
      // 修改加载数据的标记
      loading.value = true;
      // 触发加载更多行为
      emits("onLoad");
    }
  }, 100);
};
// 监听 loading的变化 解决数据加载完成后 首屏未铺满的问题
watch(loading, val => {
  emitLoad();
});
</script>

<style scoped></style>
