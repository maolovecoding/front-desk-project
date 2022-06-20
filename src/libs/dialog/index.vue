<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"></div>
    </transition>
    <!-- 内容区 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]">
        <!-- 标题 -->
        <div
          v-if="title"
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <Button
            @click="handleCancelClick!"
            :size="SizeEnum.default"
            :type="TypeEnum.main"
            >{{ cancelTest }}</Button
          >
          <Button
            @click="handleConfirmClick!"
            :size="SizeEnum.default"
            :type="TypeEnum.main"
            >{{ confirmText }}</Button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { Button, SizeEnum, TypeEnum } from "@/libs";
const props = defineProps<{
  // 控制开关
  modelValue: boolean;
  // 标题
  title?: string;
  // 取消按钮文本
  cancelTest?: string;
  // 确认按钮文本
  confirmText?: string;
  // 取消按钮点击事件
  cancelHandler?: () => any;
  // 确认按钮点击事件
  confirmHandler?: () => any;
  // 关闭的回调
  close?: () => any;
}>();
const { cancelTest = "取消", confirmText = "确认" } = props;
const isVisible = useVModel(props);
/**
 * 取消按钮点击事件
 */
const handleCancelClick = () => {
  props.cancelHandler?.();
  close();
};
/**
 * 确定按钮点击事件
 */
const handleConfirmClick = () => {
  props.confirmHandler?.();
  close();
};
const close = () => {
  isVisible.value = false;
  props.close?.();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
