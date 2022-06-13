import { FunctionalComponent } from "vue";
import SvgIcon from "../../svg-icon";

const sizeEnum = {
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
/**
 * 1. type 风格可选项 size大小可选项
 * 2. 通过props让开发者控制按钮
 * 3. 区分icon button 和 text button
 * 4. 依据当前的数据 渲染视图
 * 5. 处理点击事件
 * @returns
 */
const Button: FunctionalComponent<IButtonProps> = (
  {
    icon,
    iconClass,
    iconColor,
    type = TypeEnum.main,
    size = SizeEnum.default,
    isActiveAnim = true,
    isLoading = false,
    click,
    ...rest
  },
  { slots }
) => {
  const handleClick = (e: MouseEvent) => {
    if (isLoading) return;
    click?.(e as PointerEvent);
  };
  return (
    <button
      onClick={handleClick}
      class={`text-sm text-center rounded duration-200 flex justify-center items-center
      ${type}
      ${(sizeEnum as any)[size].button}
      ${isActiveAnim ? "active:scale-110" : ""}
    `}>
      {/* loading */}
      {isLoading ? (
        <SvgIcon name="loading" class="w-2 h-2 animate-spin mr-1" />
      ) : null}
      {/* icon */}
      {icon ? (
        <SvgIcon
          color={iconColor}
          name={icon}
          fillClass={iconClass}
          class={`m-auto w-2 h-2 mr-1 ${(sizeEnum as any)[size].icon}`}
        />
      ) : (
        // 文字按钮
        slots.default?.()
      )}
    </button>
  );
};
export default Button;

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
