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
  }
] as RouteRecordRaw[];
