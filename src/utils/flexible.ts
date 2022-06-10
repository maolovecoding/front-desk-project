import { PC_DEVICE_WIDTH } from "@/constants";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
/**
 * 响应式获取屏幕宽度 在屏幕宽度发生改变时 获取最新的值
 */
const { width } = useWindowSize();
/**
 * 判断当前是否为移动设备 判断依据就是根据屏幕宽度是否小于一个指定宽度（1280px）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH;
  // return document.documentElement.clientWidth < PC_DEVICE_WIDTH;
});
/**
 * @deprecated 不建议使用
 * 判断当前是否为移动设备 判断依据就是根据屏幕宽度是否小于一个指定宽度（1280px）
 */
export const isMobileTerminal2 = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
});
