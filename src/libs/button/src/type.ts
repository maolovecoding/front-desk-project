interface IButtonProps {
  // 图标
  icon?: string;
  // icon颜色
  iconColor?: string;
  // icon类名
  iconClass?: string;
  type?: TypeEnum;
  size?: SizeEnum;
  // 按钮点击时  是否需要动画
  isActiveAnim?: boolean;
  // 加载状态
  isLoading?: boolean;
  // 点击事件
  click?: (e: PointerEvent) => void;
}
export enum TypeEnum {
  primary = "text-white dark:bg-zinc-900 bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700",
  main = "text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700",
  info = "text-zinc-800 bg-zinc-200 dark:text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700"
}

export enum SizeEnum {
  default = "default",
  "icon-default" = "icon-default",
  small = "small",
  "icon-small" = "icon-small"
}

export const sizeEnum = {
  // 文字按钮
  default: {
    button: "w-8 h-4 text-base",
    icon: ""
  },
  // icon
  "icon-default": {
    button: "w-4 h-4",
    icon: "w-1.5 h-1.5"
  },
  small: {
    button: "w-7 h-3 text-base",
    icon: ""
  },
  "icon-small": {
    button: "w-3 h-3",
    icon: "w-1.5 h-1.5"
  }
};

export {};
