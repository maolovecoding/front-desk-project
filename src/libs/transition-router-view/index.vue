<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="handleBeforeEnter"
      @after-leave="handleAfterLeave">
      <keep-alive :include="virtualTaskStack">
        <component
          :class="{
            'fixed top-0 left-0 w-screen z-50': isAnimation
          }"
          :is="Component"
          :key="$route.fullPath"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
const { routerType = "none", mainComponentName } = defineProps<{
  // 路由跳转类型 进入组件 退出组件
  routerType?: "push" | "back" | "none";
  // 首页的组件名称
  mainComponentName: string;
}>();
const router = useRouter();
const transitionName = ref("");
/**
 * 监听路由跳转
 */
router.beforeEach((to, from) => {
  // 定义当前动画的名称
  transitionName.value = routerType;
  // 入栈
  if (routerType === "push") {
    virtualTaskStack.value.push(to.name as string);
  }
  // 出栈
  else if (routerType === "back") {
    virtualTaskStack.value.pop();
  }
  // 回到首页 清空
  if (to.name === mainComponentName) {
    clearStack();
  }
});
const isAnimation = ref(false);
const handleBeforeEnter = () => {
  isAnimation.value = true;
};
const handleAfterLeave = () => {
  isAnimation.value = false;
};
// 虚拟任务栈
const virtualTaskStack = ref([mainComponentName]);
// 回到首页 清空组件缓存栈 回到最原始值
const clearStack = () => {
  virtualTaskStack.value = [mainComponentName];
};
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
