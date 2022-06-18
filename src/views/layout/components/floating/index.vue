<template>
  <div class="fixed bottom-10 right-4">
    <!-- 引导页 -->
    <div
      @click="handleGuideClick"
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group">
      <SvgIcon
        class="w-2 h-2"
        name="guide"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main" />
    </div>
    <!-- 反馈 -->
    <Popover
      class="flex items-center guide-feedback"
      :placement="POSITION.PROP_TOP_LEFT">
      <template #reference>
        <div
          class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group">
          <SvgIcon
            class="w-2 h-2"
            name="feedback"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main" />
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
          <SvgIcon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300" />
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { SvgIcon, Popover, POSITION } from "@/libs";
import steps from "./steps";
let driver: Driver;

const handleGuideClick = () => {
  // 指定引导步骤
  driver.defineSteps(steps);
  driver.start();
};

/**
 * 引导页处理
 */
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: "关闭",
    nextBtnText: "下一步",
    prevBtnText: "上一步"
  });
});
</script>

<style scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
