<template>
  <div
    class="w-5 flex flex-col items-center justify-center mx-0.5"
    @click="handleItemClick">
    <!-- 图标 -->
    <SvgIcon :name="icon" :fillClass="iconClass" class="w-2 h-2" />
    <!-- 文字内容 -->
    <p class="text-sm mt-0.5" :class="textClass">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "@/libs";
const {
  icon,
  iconClass,
  textClass = "text-zinc-900 dark:text-zinc-200",
  to
} = defineProps<{
  icon: string;
  iconClass: string;
  textClass?: string;
  to?: string;
}>();
const router = useRouter();
const handleItemClick = () => {
  if (!to) return;
  router.push(to);
};
</script>
