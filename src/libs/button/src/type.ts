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
  primary = "text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800",
  main = "text-white bg-main hover:bg-hover-main active:bg-main",
  info = "text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200"
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

export {}
