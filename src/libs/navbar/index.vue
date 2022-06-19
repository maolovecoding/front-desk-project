<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-800 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']">
    <!-- 左 -->
    <div
      @click="handleClickLeft"
      class="h-full w-5 absolute left-0 flex items-center justify-center">
      <slot name="left">
        <SvgIcon
          name="back"
          class="h-2 w-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200">
      <slot name="center" />
    </div>
    <!-- 右 -->
    <div
      @click="handleClickRight"
      class="h-full w-5 absolute right-0 flex items-center justify-center">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "@/libs";
const router = useRouter();
const {
  sticky = false,
  clickLeft,
  clickRight
} = defineProps<{
  clickLeft?: () => {};
  clickRight?: () => {};
  // 是否吸顶
  sticky?: boolean;
}>();
const handleClickLeft = () => {
  if (clickLeft) return clickLeft();
  router.back();
};
const handleClickRight = () => {
  if (clickRight) return clickRight();
};
</script>

<style scoped></style>
