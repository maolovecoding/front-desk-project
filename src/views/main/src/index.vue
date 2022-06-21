<template>
  <div
    ref="containerRef"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List />
    </div>
    <!-- 移动端下的 tab bar -->
    <TriggerMenu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <TriggerMenuItem icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200"
        >首页</TriggerMenuItem
      >
      <TriggerMenuItem
        v-if="store.token"
        icon="vip"
        iconClass="fill-zinc-500 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="handleVIPClick"
        >vip</TriggerMenuItem
      >
      <TriggerMenuItem
        v-if="store.token"
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="handleMyClick"
        >{{ store.token ? "我的" : "去登录" }}</TriggerMenuItem
      >
    </TriggerMenu>
  </div>
</template>
<script lang="ts">
export default { name: "home" };
</script>
<script setup lang="ts">
import { ref, onActivated } from "vue";
import Navigation from "./components/navigation";
import List from "./components/list/index.vue";
import { TriggerMenu, TriggerMenuItem } from "@/libs";
import { isMobileTerminal } from "@/utils";
import { userStore, appStore } from "@/store/pinia";
import { useRouter } from "vue-router";
import { useScroll } from "@vueuse/core";
const store = userStore();
const router = useRouter();
const handleVIPClick = () => {};
const handleMyClick = () => {
  // /移动端下跳转的类型
  appStore().routerType = "push";
  if (store.token) {
    router.push("/profile");
  } else {
    router.push("/login");
  }
};
const containerRef = ref<HTMLDivElement>();
// 记录滚动位置
const { y: containerScrollTop } = useScroll(containerRef);
// 被缓存的组件再次可见时  会回调 onActivated方法
onActivated(() => {
  if (!containerRef.value) return;
  containerRef.value.scrollTop = containerScrollTop.value;
});
</script>
