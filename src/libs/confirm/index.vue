<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        @click="handleCloseClick"
        class="w-screen h-screen bg-zinc-900/70 z-40 fixed top-0 left-0"></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]">
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-center">
          <Button
            class="mr-2"
            @click="handleCancelClick"
            :type="TypeEnum.info"
            :size="SizeEnum.default"
            >{{ cancelText }}</Button
          >
          <Button
            class="mr-2"
            @click="handleConfirmClick"
            :type="TypeEnum.primary"
            :size="SizeEnum.default"
            >{{ confirmText }}</Button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { Button, SizeEnum, TypeEnum } from "@/libs";
const {
  title = "标题",
  content = "内容",
  cancelText = "取消",
  confirmText = "确认",
  cancelHandler,
  confirmHandler,
  closeHandler
} = defineProps<{
  // 标题
  title: string;
  // 描述
  content: string;
  // 取消按钮文本
  cancelText: string;
  // 确定按钮文本
  confirmText: string;
  // 取消按钮事件
  cancelHandler?: () => void;
  // 确定按钮事件
  confirmHandler?: () => void;
  // 关闭confirm时触发的回调
  closeHandler?: () => void;
}>();
const isVisible = ref(false);
// 关闭动画 执行时间
const duration = "0.5s";
const handleShow = () => {
  isVisible.value = true;
};
const handleCloseClick = () => {
  isVisible.value = false;
  // 延迟一段时间 关闭
  setTimeout(() => {
    // 等动画执行完毕后 再进行关闭
    if (typeof closeHandler === "function") closeHandler();
  }, parseInt(duration.match(/.(\d+)/)![1]) * 100);
};
const handleCancelClick = () => {
  if (typeof cancelHandler === "function") cancelHandler();
  handleCloseClick()
};
const handleConfirmClick = () => {
  if (typeof confirmHandler === "function") confirmHandler();
  handleCloseClick()
};
// 在组件挂载完成后 才进行显示 展示动画
onMounted(handleShow);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.up-enter-from,
.up-leave-to {
  transition: all v-bind(duration);
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
