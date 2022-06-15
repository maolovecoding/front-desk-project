<template>
  <div
    class="relative"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave">
    <div ref="referenceRef">
      <!-- 具名插槽 触发弹层的视图 -->
      <slot name="reference" />
    </div>

    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentRef"
        v-show="isVisible"
        :style="contentStyle"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-l-zinc-700 rounded-md">
        <!-- 匿名插槽 弹层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch, nextTick } from "vue";
import { POSITION } from "./type";
const isVisible = ref(false);
// 鼠标移出图标后 延迟 200ms 才隐藏我们的气泡层
const DELAY_TIME = 200;
let timer: any;
const handleMouseenter = () => {
  isVisible.value = true;
  if (timer) clearTimeout(timer);
};
const handleMouseleave = () => {
  timer = setTimeout(() => {
    isVisible.value = false;
    timer = null;
  }, DELAY_TIME);
};
/**
 * 1. 指定所有可选位置的常量 并生成 enum
 * 2. 通过prop控制指定位置
 * 3. 获取元素的dom 创建读取元素尺寸的方法
 * 4. 生成气泡样式对象，用来控制每个位置对应的样式
 * 5. 根据prop 计算样式对象
 */

const { placement = POSITION.PROP_BOTTOM_LEFT } = defineProps<{
  placement?: POSITION;
}>();
// 计算元素尺寸
const referenceRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();
const getElementSize = (target: HTMLDivElement) => {
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
};
const contentStyle = ref({
  top: "0px",
  left: "0px"
});
// 计算 在气泡展示的时候 计算为位置
watch(isVisible, newVal => {
  if (!newVal) return;
  // 等待渲染渲染完成后 计算
  nextTick(() => {
    switch (placement) {
      case POSITION.PROP_TOP_LEFT:
        contentStyle.value.top = "0px";
        contentStyle.value.left =
          -getElementSize(contentRef.value!).width + "px";
        break;
      case POSITION.PROP_TOP_RIGHT:
        contentStyle.value.top = "0px";
        contentStyle.value.left =
          getElementSize(referenceRef.value!).width + "px";
        break;
      case POSITION.PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: `${getElementSize(referenceRef.value!).height}px`,
          left: -getElementSize(contentRef.value!).width + "px"
        };
        break;
      case POSITION.PROP_BOTTOM_RIGHT:
        const wh = getElementSize(referenceRef.value!);
        contentStyle.value.top = wh.height + "px";
        contentStyle.value.left = wh.width + "px";
        break;
    }
  });
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
