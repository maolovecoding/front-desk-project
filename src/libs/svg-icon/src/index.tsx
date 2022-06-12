import { computed, FunctionalComponent } from "vue";

const SvgIcon: FunctionalComponent<ISvgIcon> = ({ name, color, fillClass }) => {
  const symbolId = computed(() => `#icon-${name}`);
  return (
    <svg aria-hidden>
      <use xlink:href={symbolId.value} class={fillClass} fill={color} />
    </svg>
  );
};

export default SvgIcon;

interface ISvgIcon {
  //显示的svg
  name: string;
  // 颜色
  color?: string;
  // tailwind css 指定的svg颜色的类名
  fillClass?: string;
}
