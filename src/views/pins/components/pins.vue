<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2">
    <!-- mobile -->
    <NavBar v-if="isMobileTerminal" sticky>
      {{ pexelsImage?.title }}
      <template #right>
        <SvgIcon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </template>
    </NavBar>
    <!-- PC -->
    <SvgIcon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="handlePopClick" />

    <!-- 内容 -->
    <div v-if="pexelsImage" class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelsImage.photo" />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
        <!-- 收藏 分享 -->
        <div
          v-if="!isMobileTerminal"
          class="flex justify-between items-center mb-2">
          <SvgIcon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded" />
          <Button
            :type="TypeEnum.info"
            :size="SizeEnum['icon-default']"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
            icon="heart" />
        </div>
        <!-- 标题 作者 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ pexelsImage.title }}
        </p>
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelsImage.avatar"
            alt="" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelsImage.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { getImageById, IImage } from "@/api";
import { isMobileTerminal } from "@/utils";
import NavBar from "@/libs/navbar/index.vue";
import { SvgIcon, Button, TypeEnum, SizeEnum } from "@/libs";
const { id } = defineProps<{
  id: string;
}>();
const router = useRouter();
const pexelsImage = ref<IImage>();
const getImageData = async () => {
  const res = await getImageById(id);
  pexelsImage.value = res;
};
getImageData();
// 后退按钮
const handlePopClick = () => {
  router.back();
};
</script>

<style scoped></style>
