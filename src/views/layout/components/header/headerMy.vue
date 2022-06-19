<template>
  <Popover
    class="guide-my before:flex items-center"
    :placement="POSITION.PROP_BOTTOM_LEFT">
    <template #reference>
      <div
        v-if="store.token"
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm" :src="store.userInfo.avatar" alt="" />
        <!-- 下箭头 -->
        <SvgIcon
          class="h-1.5 w-1.5 ml-1.5"
          name="down-arrow"
          fillClass="fill-zinc-900 fill-zinc-300" />
        <!-- vip -->
        <SvgIcon
          v-if="store.userInfo.vipLevel"
          class="h-1.5 w-1.5 absolute bottom-0 right-[16px]"
          name="vip" />
      </div>
      <div v-else>
        <Button
          class="guide-my"
          icon="profile"
          :size="SizeEnum['icon-default']"
          :type="TypeEnum.main"
          iconColor="#fff"
          @click="handleToLoginClick"></Button>
      </div>
    </template>
    <!-- 气泡 -->
    <div v-if="store.token" class="w-[140px] overflow-hidden">
      <div
        v-for="item in menuArr"
        :key="item.id"
        @click="handleItemClick(item)"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:bg-zinc-800">
        <SvgIcon
          :name="item.icon"
          class="w-1.5 h-1.5 ml-1 mr-1"
          fillClass="fill-zinc-900 fill-zinc-300" />
        <span class="text-sm text-zinc-700 dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Popover,
  SvgIcon,
  POSITION,
  Button,
  SizeEnum,
  TypeEnum,
  confirm
} from "@/libs";
import { userStore } from "@/store/pinia";
const store = userStore();
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
const router = useRouter();
const handleToLoginClick = () => {
  router.push("/login");
};
const handleItemClick = (item: getMenuType<typeof menuArr>) => {
  if (item.id === 2) {
    // 退出登录
    confirm("您确定要退出登录吗？").then(() => {
      store.logout();
    });
  }
};
type getMenuType<T> = T extends Array<infer V> ? V : never;
</script>

<style scoped></style>
