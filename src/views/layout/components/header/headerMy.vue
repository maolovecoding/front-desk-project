<template>
  <Popover class="flex items-center" :placement="POSITION.PROP_BOTTOM_LEFT">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100">
        <!-- 头像 -->
        <img
          class="w-3 h-3 rounded-sm"
          src="../../../../assets/logo.png"
          alt="" />
        <!-- 下箭头 -->
        <SvgIcon
          class="h-1.5 w-1.5 ml-1.5"
          name="down-arrow"
          fillClass="fill-zinc-900" />
        <!-- vip -->
        <SvgIcon
          v-if="true"
          class="h-1.5 w-1.5 absolute bottom-0 right-[16px]"
          name="vip" />
      </div>
    </template>
    <!-- 气泡 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60">
        <SvgIcon
          :name="item.icon"
          class="w-1.5 h-1.5 ml-1 mr-1"
          fillClass="fill-zinc-900" />
        <span class="text-sm text-zinc-700">{{ item.title }}</span>
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, SvgIcon, POSITION } from "@/libs";
const menuArr = [
  {
    id: 0,
    title: "个人资料",
    icon: "profile",
    path: "/profile"
  },
  {
    id: 1,
    title: "升级 VIP",
    icon: "vip-profile",
    path: "/member"
  },
  {
    id: 2,
    title: "退出登录",
    icon: "logout",
    path: ""
  }
];
</script>

<style scoped></style>
