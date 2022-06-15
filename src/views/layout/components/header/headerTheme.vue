<template>
  <div>
    <Popover>
      <template #reference>
        <SvgIcon
          :name="svgIconName!"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          class="w-4 h-4 p-1 cursor-pointer rounded-xl duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900" />
      </template>
      <!-- 弹层内容展示区 -->
      <div class="w-[140px] overflow-hidden">
        <div
          v-for="theme in themes"
          :key="theme.id"
          @click="handleThemeClick(theme)"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
          <SvgIcon
            :name="theme.icon"
            fillClass="fill-zinc-900 fill-zinc-300"
            class="w-1.5 h-1 mr-1.5" />
          <span class="text-zinc-900 text-sm dark:text-zinc-300">{{
            theme.name
          }}</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { themeStore } from "@/store/pinia";
import { Popover, SvgIcon, POSITION } from "@/libs";
import { computed } from "vue";
type getArrType<Arr extends unknown[]> = Arr extends Array<infer T> ? T : never;
enum THEME {
  THEME_LIGHT = "theme-light",
  THEME_DARK = "theme-dark",
  THEME_SYSTEM = "theme-system"
}
const themes = [
  {
    id: 0,
    type: THEME.THEME_LIGHT,
    icon: THEME.THEME_LIGHT,
    name: "极简白"
  },
  {
    id: 1,
    type: THEME.THEME_DARK,
    icon: THEME.THEME_DARK,
    name: "极夜黑"
  },
  {
    id: 2,
    type: THEME.THEME_SYSTEM,
    icon: THEME.THEME_SYSTEM,
    name: "跟随系统"
  }
];
// 监听主题切换行为
// 将行为保存到pinia
// 根据pinia中保存的当前主题 修改html的class dark 修改主题图标
const store = themeStore();
const handleThemeClick = (theme: getArrType<typeof themes>) => {
  store.changeThemeType(theme.type);
};
const svgIconName = computed(
  () => themes.find(theme => theme.type === store.themeType)?.icon
);
</script>

<style scoped></style>
