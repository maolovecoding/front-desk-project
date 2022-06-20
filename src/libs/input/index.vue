<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === 'text'"
      type="text"
      v-model="text"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-150 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full" />
    <!-- 多行 -->
    <textarea
      v-if="type === 'textarea'"
      v-model="text"
      rows="5"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-150 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full" />
    <!-- 最大长度 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{
        'text-red-700': currentNumber === max
      }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useVModel } from "@vueuse/core";
const props = defineProps<{
  // 双向数据绑定
  modelValue: string;
  // type
  type: "text" | "textarea";
  max?: number;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();
// 输入的文本内容
const text = useVModel(props);
// 输入的字符数
const currentNumber = computed(() => (text.value as string).length);
computed;
</script>

<style scoped></style>
