<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        backgroundColor: randomColor()
      }"
      @click="handleToPinsClick">
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgRef"
        class="w-full rounded bg-transparent"
        :src="item.photo"
        :style="{
          height: width
            ? (width / item.photoWidth) * item.photoHeight + 'px'
            : ''
        }" />
      <!-- 遮罩 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block">
        <!-- 分享 -->
        <ButtonVue
          :type="TypeEnum.main"
          :size="SizeEnum.default"
          class="absolute top-1.5 left-1.5"
          >分享</ButtonVue
        >
        <!-- 点赞 -->
        <ButtonVue
          class="absolute top-1.5 right-1.5"
          :type="TypeEnum.info"
          :size="SizeEnum['icon-default']"
          icon="heart"
          icon-class="fill-zinc-900 dark:fill-zinc-200" />
        <!-- 下载 -->
        <ButtonVue
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          :type="TypeEnum.info"
          icon="download"
          :size="SizeEnum['icon-default']"
          @click="handleDownloadClick"
          icon-class="fill-zinc-900 dark:fill-zinc-200" />
        <!-- 全屏 -->
        <ButtonVue
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          :type="TypeEnum.info"
          icon="full"
          :size="SizeEnum['icon-default']"
          @click="imgFullscreenClick"
          icon-class="fill-zinc-900 dark:fill-zinc-200" />
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ item.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="item.avatar" alt="头像" />
      <span class="text-sm text-zinc-500 ml-1">{{ item.author }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, computed } from "vue";
import { useFullscreen, useElementBounding } from "@vueuse/core";
import { saveAs } from "file-saver";
import { IPexelsList } from "@/api";
import { Button as ButtonVue, TypeEnum, SizeEnum, message } from "@/libs";
import { randomColor } from "@/utils";
const { item } = defineProps<{
  item: IPexelsList;
  width?: number;
}>();
const handleDownloadClick = () => {
  message("success", "下载成功");
  // 使用 file-saver完成小图片下载
  setTimeout(saveAs, 100, item.photoDownLink); // 延迟下载
};
// 生成全屏的方法
const imgRef = ref();
const { enter: imgFullscreenClick } = useFullscreen(imgRef);

const emits = defineEmits<{
  (e: "click", data: { id: string; location: any }): void;
}>();
// 获取响应式的图片的宽高等
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgRef);
// pins跳转记录 记录图片的中心点 x | y 位置 + 宽 | 高 一半
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(
      imgContainerX.value + imgContainerWidth.value / 2 + ""
    ),
    translateY: parseInt(
      imgContainerY.value + imgContainerHeight.value / 2 + ""
    )
  };
});
// 图片跳转 进入图片详情页
const handleToPinsClick = () => {
  emits("click", {
    id: item.id,
    location: imgContainerCenter.value
  });
};
</script>

<style scoped></style>
