<template>
  <div>
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import dayjs from "./utils";

const { format = "HH:mm:ss", time } = defineProps<{
  // 时间戳
  time: number;
  // 格式
  format?: string;
}>();
const emits = defineEmits<{
  (e: "change"): void;
  (e: "finish"): void;
}>();
let internal: number;
// 倒计时时长
const duration = ref(0);
// 开始倒计时
const start = () => {
  close();
  internal = setInterval(durationFn, 1000) as any as number;
};
// 倒计时执行行为
const durationFn = () => {
  duration.value -= 1000;
  emits("change");
  // 结束行为
  if (duration.value <= 0) {
    duration.value = 0;
    emits("finish");
    close();
  }
};
// 倒计时结束
const close = () => {
  if (internal) clearInterval(internal);
};

watch(
  () => time,
  newTime => {
    duration.value = newTime;
    start();
  },
  { immediate: true }
);
// 组件销毁 清理倒计时
onUnmounted(() => {
  close();
});
// 显示的时间格式
const showTime = computed(() => dayjs.duration(duration.value).format(format));
</script>

<style scoped></style>
