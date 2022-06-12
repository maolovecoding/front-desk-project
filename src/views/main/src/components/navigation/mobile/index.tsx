/*
 * @Author: 毛毛
 * @Date: 2022-06-10 19:15:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-06-11 20:45:29
 */
import {
  defineComponent,
  FunctionalComponent,
  onBeforeUpdate,
  ref,
  watch,
  defineProps
} from "vue";
import { useScroll } from "@vueuse/core";
import { SvgIcon } from "@/libs";
import { ICategory, IMobileProps } from "../type";
// const Mobile: FunctionalComponent<IMobileProps> = ({ categories }) => {
//   const sliderRef = ref();
//   const sliderStyle = ref({
//     transform: "translateX(0px)",
//     width: "60px"
//   });
//   // 获取ul
//   const ulRef = ref();
//   // 选中的item项的下标
//   const currCategoryIndex = ref(0);
//   // 获取所有的 item 元素
//   const itemRefs: HTMLLIElement[] = [];
//   const setItemRefs = (el: any) => {
//     console.log(el);
//     if (el) {
//       itemRefs.push(el);
//     }
//   };
//   // 数据发生改变 DOM更新之前执行该回调
//   onBeforeUpdate(() => {
//     // 重置ref选项
//     itemRefs.length = 0;
//   });
//   // 通过 vueuse -》 vueScroll 获取响应式的 scroll 滚动距离 横向滚动偏离位置
//   const { x: ulScrollLeft } = useScroll(ulRef);
//   watch(currCategoryIndex, newIndex => {
//     const rect = itemRefs[newIndex].getBoundingClientRect();
//     sliderStyle.value = {
//       transform: "translateX(0px)",
//       width: "60px"
//     };
//   });
//   const handleItemClick = (index: number) => {
//     currCategoryIndex.value = index;
//   };
//   return (
//     <div class="bg-white sticky top-0 left-0 z-10">
//       <ul
//         ref={ulRef}
//         class="relative flex overflow-x-auto text-xs text-zinc-600 overflow-hidden">
//         {/* 滑块 */}
//         <li
//           ref={sliderRef.value}
//           style={sliderStyle.value}
//           class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"></li>
//         {/* 折叠按钮 */}
//         <li class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
//           <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
//         </li>
//         {categories.map((category, index) => (
//           // 给最后一个item指定右边距 last:mr-4
//           <li
//             onClick={() => handleItemClick(index)}
//             ref={setItemRefs}
//             class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
//             key={category.id}>
//             {category.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export { Mobile };

export default defineComponent<{ categories: ICategory[] }>({
  setup(props) {
    console.log(1);
    // const props = defineProps<IMobileProps>();
    const sliderRef = ref();
    const sliderStyle = ref({
      transform: "translateX(0px)",
      width: "60px"
    });
    setTimeout(() => {
      console.log(props.categories);
    }, 1000);
    // 获取ul
    const ulRef = ref();
    // 选中的item项的下标
    const currCategoryIndex = ref(0);
    // 获取所有的 item 元素
    const itemRefs: HTMLLIElement[] = [];
    const setItemRefs = (el: any) => {
      console.log(el);
      if (el) {
        itemRefs.push(el);
      }
    };
    // 数据发生改变 DOM更新之前执行该回调
    onBeforeUpdate(() => {
      // 重置ref选项
      itemRefs.length = 0;
    });
    // 通过 vueuse -》 vueScroll 获取响应式的 scroll 滚动距离 横向滚动偏离位置
    const { x: ulScrollLeft } = useScroll(ulRef);
    watch(currCategoryIndex, newIndex => {
      const rect = itemRefs[newIndex].getBoundingClientRect();
      sliderStyle.value = {
        transform: "translateX(0px)",
        width: "60px"
      };
    });
    const handleItemClick = (index: number) => {
      currCategoryIndex.value = index;
    };
    return () => {
      return (
        <div class="bg-white sticky top-0 left-0 z-10">
          <ul
            ref={ulRef.value}
            class="relative flex overflow-x-auto text-xs text-zinc-600 overflow-hidden">
            {/* 滑块 */}
            <li
              ref={sliderRef.value}
              style={sliderStyle.value}
              class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"></li>
            {/* 折叠按钮 */}
            <li class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
              <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
            </li>
            {props.categories?.map((category, index) => (
              // 给最后一个item指定右边距 last:mr-4
              <li
                onClick={() => handleItemClick(index)}
                ref={setItemRefs}
                class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
                key={category.id}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      );
    };
  }
});
