<template>
  <div>
    <Popover>
      <template #reference>
        <SvgIcon
          name="theme-light"
          fillClass="fill-zinc-900"
          class="w-4 h-4 p-1 cursor-pointer rounded-xl duration-200 outline-none hover:bg-zinc-100/60" />
      </template>
      <!-- 弹层内容展示区 -->
      <div class="w-[140px] overflow-hidden">
        <div
          v-for="theme in themes"
          :key="theme.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60">
          <SvgIcon
            :name="theme.icon"
            fillClass="fill-zinc-900"
            class="w-1.5 h-1 mr-1.5" />
          <span class="text-zinc-900 text-sm">{{ theme.name }}</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, SvgIcon, POSITION } from "@/libs";
enum THEME {
  THEME_LIGHT = "theme-light",
  THEME_DARK = "theme-dark",
  THEME_SYSTEM = "theme-system"
}
const themes = [
  {
    id: 0,
    // type: THEME.THEME_LIGHT,
    icon: THEME.THEME_LIGHT,
    name: "极简白"
  },
  {
    id: 1,
    // type: THEME.THEME_DARK,
    icon: THEME.THEME_DARK,
    name: "极夜黑"
  },
  {
    id: 2,
    // type: THEME.THEME_SYSTEM,
    icon: THEME.THEME_SYSTEM,
    name: "跟随系统"
  }
];
</script>

<style scoped></style>
