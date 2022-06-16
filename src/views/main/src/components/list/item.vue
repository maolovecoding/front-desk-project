<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img class="w-full rounded bg-transparent" :src="item.photo" />
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
          icon-class="fill-zinc-900 dark:fill-zinc-200" />
        <!-- 全屏 -->
        <ButtonVue
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          :type="TypeEnum.info"
          icon="full"
          :size="SizeEnum['icon-default']"
          icon-class="fill-zinc-900 dark:fill-zinc-200" />
      </div>
      <!-- 标题 -->
      <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
        {{ item.title }}
      </p>
      <!-- 作者 -->
      <div class="flex items-center mt-1 px-1">
        <img class="h-2 w-2 rounded-full" :src="item.avatar" alt="头像" />
        <span class="text-sm text-zinc-500 ml-1">{{ item.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IPexelsList } from "@/api";
import { Button as ButtonVue, TypeEnum, SizeEnum } from "@/libs";
defineProps<{
  item: IPexelsList;
}>();
</script>

<style scoped></style>
