<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <Header />
    <!-- 内容表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">
        注册账号
      </h3>
      <!-- 表单 -->
      <VeeForm @submit="handleRegister">
        <VeeField
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          v-model="regForm.username"
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
          v-model="regForm.password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          :rules="validatePassword" />
        <VeeErrorMessage
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left" />
        <VeeField
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          autocomplete="on"
          v-model="regForm.confirmPassword"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          rules="validateConfirmPassword:@password" />
        <VeeErrorMessage
          name="confirmPassword"
          class="text-sm text-red-600 block mt-0.5 text-left" />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-1 leading-[0px] text-right">
          <a
            class="inline-block px-1 pt-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >去登录</a
          >
        </div>
        <!-- 注册协议 -->
        <div class="text-center">
          <a
            target="_blank"
            href="#"
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300">
            注册即同意本网站的协议
          </a>
        </div>
        <Button
          :isActiveAnim="false"
          :isLoading="loading"
          class="block w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >立即注册</Button
        >
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from "vee-validate";
import { Button } from "@/libs";
import Header from "../components/header.vue";
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from "../validate";
import { userStore } from "@/store/pinia";
import { useRouter } from "vue-router";
const router = useRouter();
const store = userStore();
/**
 * 插入规则
 */
defineRule("validateConfirmPassword", validateConfirmPassword);
const loading = ref(false);

/**
 * 登录
 */
const handleRegister = async () => {
  loading.value = true;
  try {
    const res = await store.registerAction({
      username: regForm.value.username,
      password: regForm.value.password
    });
    // 注册完成 触发登录
    store.loginAction({
      username: regForm.value.username,
      password: regForm.value.password,
      loginType: "username"
    });
    console.log(res);
    router.push("/")
  } finally {
    loading.value = false;
  }
};
const handleClose = () => {};
const handleSuccess = () => {};
const regForm = ref({
  username: "",
  password: "",
  confirmPassword: ""
});
</script>

<style scoped></style>
