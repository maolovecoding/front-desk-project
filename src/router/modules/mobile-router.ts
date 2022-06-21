import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/main")
  },
  {
    path: "/pins/:id",
    name: "pins",
    component: () => import("@/views/pins/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login-register/login/index.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/login-register/register/index.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/profile/index.vue"),
    meta: {
      // 标记当前的页面只有用户登录后才能进入
      user: true
    }
  },
  {
    path: "/member",
    name: "member",
    component: () => import("@/views/member/index.vue"),
    meta: {
      // 标记当前的页面只有用户登录后才能进入
      user: true
    }
  }
] as RouteRecordRaw[];
