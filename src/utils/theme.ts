import { watch } from "vue";
import { themeStore } from "@/store/pinia";
import { DEFAULT_THEME, THEME_DARK, THEME_SYSTEM } from "@/constants";
/**
 * 更改主题
 * @param newTheme
 */
const changeTheme = (newTheme: string) => {
  let theme: string = "light";
  switch (newTheme) {
    case DEFAULT_THEME:
      theme = "light";
      break;
    case THEME_DARK:
      theme = "dark";
      break;
    case THEME_SYSTEM:
      // 调用方法 监听系统主题的变化
      watchSystemThemeChange();
      // 根据查询到的系统主题是dark还是light
      theme = matchMedia.matches ? "dark" : "light";
      break;
  }
  // 修改html上的class属性
  document.documentElement.className = theme;
};
/**
 * 初始化主题
 */
export const initTheme = () => {
  /**
   * 当主题发生改变时 或者进入系统时 可以进行html css class的配置
   */
  const store = themeStore();
  watch(() => store.themeType, changeTheme, {
    immediate: true
  });
};

let matchMedia: MediaQueryList;
/**
 *
 * @returns 监听系统主题的变更
 */
const watchSystemThemeChange = () => {
  // 仅需一次初始化
  if (matchMedia) return;
  // 获取用户操作系统的主题
  // prefers-color-scheme CSS 媒体特性用于检测用户是否有将系统的主题色设置为亮色或者暗色。
  matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM);
  };
};
