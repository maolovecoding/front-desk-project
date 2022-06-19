<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl">
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <SvgIcon
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="handleReset" />
      <SvgIcon
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="handleClose" />
    </div>
    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits } from "vue";
import { SvgIcon } from "@/libs";
import { getCaptcha } from "@/api";
import "@/vendor/SliderCaptcha/slidercaptcha.min.css";
import "@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js";

const emits = defineEmits<{
  (e: "success"): void;
  (e: "close"): void;
}>();
/**
 * 使用人类行为验证
 * 1. 创建 captcha实例
 */
let captcha: any = null;
onMounted(() => {
  captcha = sliderCaptcha({
    id: "captcha",
    async onSuccess(arr) {
      const res = await getCaptcha({ behavior: arr });
      //  res为true 表示验证通过
      if (res) emits("success");
    },
    onFail() {
      console.log("fail");
    },
    // onRefresh() {
    //   console.log("reset");
    // },
    verify(arr, url) {
      // console.log(arr,url)
      return true;
    }
  });
});
const handleReset = () => {
  captcha.reset();
};
const handleClose = () => {
  emits("close");
};
</script>
