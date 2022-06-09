import { PC_DEVICE_WIDTH } from "@/constants";
import { computed } from "vue";

/**
 * @deprecated 不建议使用
 * 判断当前是否为移动设备 判断依据就是根据屏幕宽度是否小于一个指定宽度（1280px）
 */
export const isMobileTerminal2 = computed(() => {
  return document.documentElement.clientWidth < PC_DEVICE_WIDTH;
});
/**
 * 判断当前是否为移动设备 判断依据就是根据屏幕宽度是否小于一个指定宽度（1280px）
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
});
