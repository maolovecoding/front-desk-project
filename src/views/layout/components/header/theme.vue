<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themesData.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomColor()
        }">
        <img
          v-lazy
          class="h-full w-full object-cover rounded"
          :src="themesData.big.photo" />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none">
          # {{ themesData.big.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themesData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded">
          <img
            v-lazy
            class="w-full h-full object-cover rounded"
            :src="item.photo"
            alt="" />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none">
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getThemes, ITheme } from "@/api";
import { randomColor } from "@/utils";
const themesData = ref<{ big: ITheme; list: ITheme[] }>({
  // 第一张图作为大图
  big: {} as ITheme,
  // 其余的图作为小图
  list: [] as ITheme[]
});
const getThemesData = async () => {
  const { themes } = await getThemes();
  themesData.value = {
    big: themes[0],
    list: themes.slice(1)
  };
};
getThemesData();
</script>

<style scoped></style>
