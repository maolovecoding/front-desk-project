/*
 * @Author: 毛毛
 * @Date: 2022-06-16 16:08:12
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-06-16 16:21:35
 */
import { Directive } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
// 懒加载指令
export default {
  // 图片懒加载 在用户无法看见图片时 不加载图片 看见时再加载图片
  mounted(el: HTMLImageElement) {
    // 把图片src保存起来
    const src = el.src;
    // 将图片的src置空
    el.src = "";
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // 当前图片用户可见
      if (isIntersecting) {
        // 请求图片
        el.src = src;
        // 停止监听
        stop();
      }
    });
  }
} as Directive;
