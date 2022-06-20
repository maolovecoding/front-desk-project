// 页面权限控制中心
/**
 * 处理需要登录以后才能访问的页面
 */
import router from "@/router";
import { userStore } from "@/store/pinia";
import { message } from "@/libs";
router.beforeEach((to, from) => {
  // 无需登录的页面访问
  if (!to.meta.user) return;
  // 需要登录的页面访问
  const store = userStore();
  // 已经登录
  if (store.token) return true;
  // 需要登录 但是没有登录就访问的页面
  message("warn", "登录失效, 请重新登录！");
  return "/";
});
