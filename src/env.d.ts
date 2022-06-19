/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const sliderCaptcha: (options: {
  // 渲染位置 指定的DOM id
  id: string;
  // 验证成功后回调此函数
  onSuccess?: (arr: any) => void;
  // 验证失败
  onFail?: () => void;
  // 点击重新加载图标时回调此函数
  onRefresh?: () => void;
  verify: (arr: any, url: string) => boolean;
}) => {
  reset: () => void;
};
