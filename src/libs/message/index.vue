<template>
  <div>
    <transition name="down">
      <div
        v-show="isVisible"
        class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
        :class="style[type].containerClass">
        <SvgIcon
          :name="style[type].icon"
          class="w-1.5 h-1.5 mr-1.5"
          :fill-class="style[type].fillClass" />
        <span class="text-sm" :class="style[type].textClass">{{
          content
        }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { SvgIcon } from "@/libs";
const { type, duration, destroy, content } = defineProps<{
  // 消息类型
  type: "success" | "error" | "warn";
  // 描述文本
  content: string;
  // 展示时长
  duration: number;
  // 关闭的回调
  destroy: () => void;
}>();
const style = {
  success: {
    icon: "success",
    fillClass: "fill-success-300",
    textClass: "text-success-300",
    containerClass:
      "bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100"
  },
  error: {
    icon: "error",
    fillClass: "fill-error-300",
    textClass: "text-error-300",
    containerClass:
      "bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100"
  },
  warn: {
    icon: "warn",
    fillClass: "fill-warn-300",
    textClass: "text-warn-300",
    containerClass:
      "bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100"
  }
};
// 为了可以展示动画 需要在挂载到页面之后 再进行显示 销毁也是在动画结束后
const isVisible = ref(false);
const animDuration = "0.5s";
onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
    setTimeout(() => {
      destroy();
    }, parseInt(animDuration.match(/.(\d+)/)![1]) * 100);
  }, duration);
});
</script>

<style scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
