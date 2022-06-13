import { FunctionalComponent, Transition } from "vue";
import { useVModel } from "@vueuse/core";
import SvgIcon from "../../svg-icon";
import Button, { SizeEnum } from "../../button";
import "./index.scss";
/**
 * 1. 实现输入内容实现双向数据绑定
 * 2. 搜索按钮在hover时 展示
 * 3. 一键清空文本
 * 4. 触发搜索
 * 5. 控制搜索内容区域的显示
 * 6. 事件处理
 * @param props
 * @param param1
 * @returns
 */
const Search: FunctionalComponent<{
  modelValue: string;
  "update:modelValue": (val: string) => void;
}> = ({ modelValue }, { slots }) => {
  return (
    <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
      <div>
        {/* 搜索图标 */}
        <SvgIcon
          name="search"
          color="#707070"
          class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        />
        {/* 输入框 */}
        <input
          v-model={modelValue}
          placeholder="搜索"
          type="text"
          class={`
        block w-full h-[44px] pl-4 outline-0 bg-zinc-100
        caret-zinc-400 rounded-xl text-sm text-zinc-900 tracking-wide
        font-semibold border border-zinc-100 duration-500 focus:border-red-300
        group-hover:bg-white hover:border-zinc-200
        `}
        />
        {/* 删除按钮 */}
        <SvgIcon
          name="input-delete"
          class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        />
        {/* 分割线 */}
        <div class="opacity-0 w-[1px] h-1.5 absolute translate-y-[-50%] top-[50%] right-[60px] duration-500 bg-zinc-200 group-hover:opacity-100"></div>
        {/* 搜索按钮 */}
        <Button
          class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full"
          icon="search"
          size={SizeEnum["icon-default"]}
          iconColor="#fff"
        />
      </div>
      {/* 搜索建议 显示 */}
      <Transition name="slide">
        <div class="w-full rounded max-h-[368px] overflow-auto text-base bg-white absolute left-0 top-[56px] z-20 border border-zinc-200 duration-200 hover:shadow-2xl">
          {slots.default?.()}
        </div>
      </Transition>
    </div>
  );
};
export default Search;
