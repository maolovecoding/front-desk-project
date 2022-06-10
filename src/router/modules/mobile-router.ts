import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/main")
  }
] as RouteRecordRaw[];
