import { createRouter, createWebHistory } from "vue-router";
import { isMobileTerminal } from "@/utils";
import pcRoutes from "./modules/pc-router";
import mobileRoutes from "./modules/mobile-router";

const router = createRouter({
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes,
  history: createWebHistory()
});

export default router;
