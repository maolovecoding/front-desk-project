<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2">
      <!-- 移动端 -->
      <Navbar sticky v-if="isMobileTerminal" :clickLeft="handleNavbarLeftClick"
        >个人资料</Navbar
      >
      <!-- pC端 -->
      <div class="text-lg font-bold text-center mb-4 dark:text-zinc-300" v-else>
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3">
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <div
            @click="handleAvatarClick"
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]">
            <img
              class="rounded-full h-full w-full xl:inline-block"
              :src="store.userInfo.avatar" />
            <div
              class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block xl:duration-200">
              <SvgIcon name="change-header-image" class="w-2 h-2 m-auto mt-2" />
              <span
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
                >点击更换头像</span
              >
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            type="file"
            ref="inputFileRef"
            accept=".png, .jpeg, .jpg, .gif"
            @change="handleSelectImgChange" />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg，png，jpeg，gif 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 信息输入 -->
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <Input
            type="text"
            class="w-full"
            :max="20"
            :modelValue="store.userInfo.nickname"
            @update:model-value="handleChangeUserInfo('nickname', $event)" />
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <Input
            type="text"
            class="w-full"
            :modelValue="store.userInfo.title"
            @update:model-value="handleChangeUserInfo('title', $event)" />
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <Input
            type="text"
            class="w-full"
            :modelValue="store.userInfo.company"
            @update:model-value="handleChangeUserInfo('company', $event)" />
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <Input
            type="text"
            class="w-full"
            :modelValue="store.userInfo.homePage"
            @update:model-value="handleChangeUserInfo('homePage', $event)" />
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <Input
            type="textarea"
            class="w-full"
            :max="50"
            v-model="store.userInfo.introduction" />
        </div>

        <!-- 保存修改 -->
        <Button
          :type="TypeEnum.main"
          :size="SizeEnum.default"
          @click="handleChangeProfileClick"
          :isLoading="loading"
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          >保存修改</Button
        >
        <!-- 移动端 退出登录 -->
        <Button
          v-if="isMobileTerminal"
          :type="TypeEnum.main"
          :size="SizeEnum.default"
          @click="handleLogoutClick"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          >退出登录</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  SvgIcon,
  Input,
  Button,
  TypeEnum,
  SizeEnum,
  confirm,
  message
} from "@/libs";
import Navbar from "@/libs/navbar/index.vue";
import { isMobileTerminal } from "@/utils";
import { useRouter } from "vue-router";
import { userStore } from "@/store/pinia";
import { IUserProfile, updateProfile } from "@/api";
const router = useRouter();
const store = userStore();
/**
 * 后退
 */
const handleNavbarLeftClick = () => {
  router.back();
};
const handleSelectImgChange = () => {};

const userInfo = store.userInfo;
const handleChangeUserInfo = (key: keyof IUserProfile, value: string) => {
  store.setUserInfo({
    ...store.userInfo,
    [key]: value
  });
};
const loading = ref(false);
/**
 * 确认修改个人信息
 */
const handleChangeProfileClick = async () => {
  loading.value = true;
  try {
    await updateProfile(store.userInfo);
    message("success", "用户信息修改成功！");
  } catch (error) {
    message("error", "用户信息修改失败！");
  } finally {
    loading.value = false;
  }
};
/**
 * 退出登录
 */
const handleLogoutClick = () => {
  confirm("您确定退出登录吗？").then(() => {
    store.logout();
  });
};
/**
 * 头像选择隐藏域
 */
const inputFileRef = ref<HTMLInputElement>();
/**
 * 选择头像
 */
const handleAvatarClick = () => {
  // 触发选择文件
  inputFileRef.value?.click();
};
</script>

<style scoped></style>
