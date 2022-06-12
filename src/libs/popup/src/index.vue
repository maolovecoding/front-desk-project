<template>
  <div>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" />
      </Transition>
      <Transition name="popup-down-up">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0">
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";
import { useScrollLock } from "@vueuse/core";
const props = defineProps<{
  modelValue: boolean;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", isVisible: boolean): void;
}>();
// 锁定滚动
const isLocked = useScrollLock(document.body);
watch(
  () => props.modelValue,
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
