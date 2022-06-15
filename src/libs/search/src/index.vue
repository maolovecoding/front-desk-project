<template>
  <div
    ref="containerRef"
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40">
    <div>
      <!-- 搜索图标 -->
      <SvgIcon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" />
      <!-- {/* 输入框 */} -->
      <input
        v-model="inputValue"
        @keyup.enter="handleSearchClick"
        @focus="handleGetFocus"
        @blur="handleBlur"
        placeholder="搜索"
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-sm text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border dark:border-zinc-700 border-zinc-100 duration-500 focus:border-red-300 group-hover:bg-white dark:group-hover:bg-zinc-900 hover:border-zinc-200 dark:group-hover:border-zinc-700" />
      <!--  删除按钮  -->
      <SvgIcon
        v-show="inputValue"
        @click="handleClearClick"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500" />
      <!-- {/* 分割线 */} -->
      <div
        class="opacity-0 w-[1px] h-1.5 absolute translate-y-[-50%] top-[50%] right-[60px] duration-500 bg-zinc-200 group-hover:opacity-100"></div>
      <!-- {/* 搜索按钮 */} -->
      <Button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100 duration-500"
        icon="search"
        :size="SizeEnum['icon-default']"
        :type="TypeEnum.main"
        @click="handleSearchClick"
        iconColor="#fff" />
    </div>
    <!-- {/* 搜索建议 显示 */} -->
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="w-full rounded max-h-[368px] overflow-auto text-base bg-white dark:bg-zinc-800 absolute left-0 top-[56px] z-20 border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl">
        <slot name="dropdown" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { useVModel, onClickOutside } from "@vueuse/core";
import SvgIcon from "../../svg-icon";
import Button, { SizeEnum, TypeEnum } from "../../button";
const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
  // 删除所有文本
  (e: "clear", val: string): void;
  // 输入事件
  (e: "input", val: string): void;
  // 获取焦点
  (e: "focus"): void;
  // 失去焦点
  (e: "blur"): void;
}>();
const inputValue = useVModel(props);

const handleClearClick = () => {
  emits("clear", "");
  inputValue.value = "";
};
const handleSearchClick = () => {
  emits("search", inputValue.value);
};
// 输入框是否获取到焦点
const isFocus = ref(false);
const handleGetFocus = () => {
  emits("focus");
  isFocus.value = true;
};
const containerRef = ref();
// 点击了搜索内容显示区域外面的地方 隐藏搜索内容
onClickOutside(containerRef, () => {
  isFocus.value = false;
});
const handleBlur = () => {
  emits("blur");
};
watch(inputValue, newVal => {
  emits("input", newVal);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
