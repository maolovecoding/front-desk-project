<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{ height: containerHeight + 'px' }">
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }">
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 加载中提示 -->
    <div v-else>加载中</div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  onUnmounted
} from "vue";
import {
  getImgElements,
  getAllImg,
  onImgComplete,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from "./utils";
const {
  data,
  nodeKey,
  column = 2,
  columnSpacing = 20,
  rowSpacing = 20,
  picturePreReading = true
} = defineProps<{
  // 数据源
  data: any[];
  // 唯一标识
  nodeKey?: string;
  // 列数
  column?: number;
  // 列间距
  columnSpacing?: number;
  // 行间距
  rowSpacing?: number;
  // 是否需要图片预加载
  picturePreReading?: boolean;
}>();
// 容器 ref
const containerRef = ref<HTMLDivElement>();
// 容器总高度
const containerHeight = ref(0);
// 记录每列容器的高度
const columnHeightObj = ref<{ [key: number]: number }>({});
const useColumnHeightObj = () => {
  columnHeightObj.value = {};
  for (let i = 0; i < column; i++) {
    columnHeightObj.value[i] = 0;
  }
};
// 容器总宽度 不包含 padding margin border
const containerWidth = ref(0);
// 容器左边距 用来计算item的left
const containerLeft = ref(0);
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerRef.value!,null);
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft);
  // 容器的宽度
  containerWidth.value =
    containerRef.value!.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight);
};
// 列宽
const columnWidth = ref(0);
// 列间距的合计
const columnSpacingTotal = computed(() => columnSpacing * (column - 1));
// 计算列宽
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth();
  // 计算列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / column;
};
// 挂载后计算列宽
onMounted(useColumnWidth);

// item高度集合
let itemHeights: any[];
/**
 * 监听图片加载完成的方法 需要预加载
 */
const waitImgComplete = () => {
  itemHeights = [];
  // 拿到所有元素
  const itemElements: HTMLDivElement[] = Array.from(
    document.getElementsByClassName("m-waterfall-item")
  ) as HTMLDivElement[];
  // 获取到元素的img标签
  const imgElements = getImgElements(itemElements);
  // 获取 所有的 img标签的图片
  const allImg = getAllImg(imgElements);
  // 等待图片加载完成
  onImgComplete(allImg).then(() => {
    // 图片加载完成 可以获取高度
    itemElements.forEach(el => itemHeights.push(el.offsetHeight));
    // 渲染图片位置
    useItemLocation();
  });
};
/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
  itemHeights = [];
  // 拿到所有元素
  const itemElements: HTMLDivElement[] = Array.from(
    document.getElementsByClassName("m-waterfall-item")
  ) as HTMLDivElement[];
  // 计算高度
  itemElements.forEach(el => itemHeights.push(el.offsetHeight));
  // 渲染图片位置
  useItemLocation();
};
const useItemLocation = () => {
  // 处理数据源
  data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return;
    item._style = {};
    item._style.left = getItemLeft();
    item._style.top = getItemTop();
    // 指定的列 进行高度的自增
    incrementingHeight(index);
  });
  // 指定容器的高度  最大高度
  const maxHeight = getMaxHeight(columnHeightObj.value);
  containerHeight.value = maxHeight;
};
/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  // 拿到第几列
  const col = getMinHeightColumn(columnHeightObj.value);
  return col * (columnWidth.value + columnSpacing) + containerLeft.value;
};

/**
 * 获取下一个item的top
 */
const getItemTop = () => {
  // 拿到当前项排列位置的列的上一张图片的高度
  return getMinHeight(columnHeightObj.value);
};
/**
 * 指定列的高度递增
 */
const incrementingHeight = (index: number) => {
  // 最小高度所在列
  const minCol = getMinHeightColumn(columnHeightObj.value);
  // 递增 当前列高度 + 当前图片高度 + 行间距
  columnHeightObj.value[minCol] += itemHeights[index] + rowSpacing;
};

/**
 * 触发计算 当数据发生改变时  重新计算位置
 */
watch(
  () => data,
  newData => {
    nextTick(() => {
      // /第一次获取数据时  构建高度记录容器
      const resetColumnHeight = newData.every(item => !item._style);
      if (resetColumnHeight) {
        // 重新构建
        useColumnHeightObj();
      }
      if (picturePreReading) waitImgComplete();
      else useItemHeight();
    });
  },
  {
    deep: true,
    immediate: true
  }
);

onUnmounted(() => {
  // 清除所有item项上的 _style
  data.forEach(item => delete item._style);
});
</script>

<style scoped></style>
