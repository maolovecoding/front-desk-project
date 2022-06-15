<template>
  <div>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isVisible"
          @click="isVisible = false"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" />
      </Transition>
      <Transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";
import { useScrollLock, useVModel } from "@vueuse/core";
const props = defineProps<{
  modelValue: boolean;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", isVisible: boolean): void;
}>();
// 返回值是响应式数据 当isVisible值发生改变的时候 会自动出触发emit修改modelValue
const isVisible = useVModel(props)
// 锁定滚动
const isLocked = useScrollLock(document.body);
watch(
  // () => props.modelValue,
  isVisible,
  newModelValue => {
    isLocked.value = newModelValue;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active,
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
// 准备进入 离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// .popup-down-up-enter-active,
// .popup-down-up-leave-active {
//   transition: all 0.3s;
// }
// 准备进入 离开完成
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
