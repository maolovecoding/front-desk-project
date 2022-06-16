/*
 * @Author: 毛毛
 * @Date: 2022-06-16 10:33:18
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-06-16 11:41:30
 */
/**
 * 从 itemElements拿到所有的imgElements
 */
export const getImgElements = (itemElement: Element[]) => {
  const imgElements: HTMLImageElement[] = [];
  itemElement.forEach(el => {
    imgElements.push(...Array.from(el.getElementsByTagName("img")));
  });
  return imgElements;
};

export const getAllImg = (imgElements: HTMLImageElement[]) => {
  return imgElements.map(img => img.src);
};

/**
 * 等待所有图片异步加载完成
 */
export const onImgComplete = (imgs: string[]) => {
  const promiseAll: Promise<{ src: string; index: number }>[] = [];
  imgs.forEach((src, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理img的加载情况
      const imgObj = new Image();
      imgObj.src = src;
      // 监听图片加载完成的情况
      imgObj.onload = () => {
        resolve({ src, index });
      };
    });
  });
  return Promise.all(promiseAll);
};

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj: {
  [key: number]: number;
}) => {
  // 拿到最小的列高度
  const minHeight = getMinHeight(columnHeightObj);
  // 拿到最小高度对应的key
  return +Object.keys(columnHeightObj).find(
    (key: any) => columnHeightObj[key] === minHeight
  )!;
};

export const getMinHeight = (columnHeightObj: { [key: number]: number }) => {
  return Math.min(...Object.values(columnHeightObj));
};

export const getMaxHeight = (columnHeightObj: { [key: number]: number }) => {
  return Math.max(...Object.values(columnHeightObj));
};
