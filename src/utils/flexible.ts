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

// 最大值
const MAX_FONT_SIZE = 40;
/**
 * 动态指定 rem 基准值 最大 40px
 * 根据用户的屏幕宽度 进行计算 把计算的值给根标签 html
 * 作为font-size的基准值
 */
export const useREM = () => {
  // 监听 html解析完成事件
  document.addEventListener("DOMContentLoaded", () => {
    // 拿到 html 标签
    // 计算fonts-size 根据屏幕宽度 / 10 = 字体大小
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 设置字体大小
    document.querySelector("html")!.style.fontSize = fontSize + "px";
  });
};
