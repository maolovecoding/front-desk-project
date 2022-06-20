<template>
  <button
    @click="handleClick"
    class="text-sm text-center rounded duration-200 flex justify-center items-center"
    :class="[type, (sizeEnum as any)[size].button,isActiveAnim?'active:scale-110':'']">
    <SvgIcon
      v-if="isLoading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1" />
    <SvgIcon
      v-if="icon"
      :color="iconColor"
      :name="icon"
      :fillClass="iconClass"
      class="m-auto w-2 h-2 mr-1"
      :class="(sizeEnum as any)[size].icon" />

    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import SvgIcon from "../../svg-icon";
import { TypeEnum, SizeEnum, sizeEnum } from "./type";
export interface IButtonProps {
  // 图标
  icon?: string;
  // icon颜色
  iconColor?: string;
  // icon类名
  iconClass?: string;
  type?: TypeEnum;
  size?: SizeEnum;
  // 按钮点击时  是否需要动画
  isActiveAnim?: boolean;
  // 加载状态
  isLoading?: boolean;
}
const emits = defineEmits<{
  (e: "click", event: PointerEvent): any;
}>();
const {
  icon,
  iconClass,
  iconColor,
  type = TypeEnum.main,
  size = SizeEnum.default,
  isActiveAnim = true,
  isLoading = false
} = defineProps<IButtonProps>();
const handleClick = (e: MouseEvent) => {
  if (isLoading) return;
  emits("click", e as PointerEvent);
};
</script>

<style scoped></style>
