<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <Header />
    <!-- 内容表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">
        账号登录
      </h3>
      <!-- 表单 -->
      <VeeForm @submit="handleLogin">
        <VeeField
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          :rules="validateUsername" />
        <VeeErrorMessage
          name="username"
          class="text-sm text-red-600 block mt-0.5 text-left" />
        <VeeField
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          :rules="validatePassword" />
        <VeeErrorMessage
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left" />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >去注册</a
          >
        </div>
        <!-- 登录 -->
        <Button
          :isActiveAnim="false"
          class="block w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >登录</Button
        >
      </VeeForm>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <SvgIcon class="w-4 cursor-pointer" name="qq" />
        <!-- 微信 -->
        <SvgIcon class="w-4 cursor-pointer" name="wexin" />
      </div>
    </div>
    <SliderCaptcha />
  </div>
</template>

<script setup lang="ts">
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from "vee-validate";
import { Button, SvgIcon } from "@/libs";
import Header from "../components/header.vue";
import SliderCaptcha from "./slider-captcha.vue";
import { validateUsername, validatePassword } from "../validate";
/**
 * 登录
 */
const handleLogin = () => {
  console.log(1);
};
</script>

<style scoped></style>
