import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/layout/index.vue"),
    children: [
      { path: "", name: "home", component: () => import("@/views/main") }
    ]
  }
] as RouteRecordRaw[];
