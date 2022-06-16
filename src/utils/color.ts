/*
 * @Author: 毛毛
 * @Date: 2022-06-16 16:48:08
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-06-16 16:53:54
 */
// 生成随机颜色

export const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};
