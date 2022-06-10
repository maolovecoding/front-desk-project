/*
 * @Author: 毛毛
 * @Date: 2022-06-10 19:15:51
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-06-10 19:54:07
 */
import { getCategory } from "@/api";
export default () => {
  const getCategoryData = async () => {
    const categoryData = await getCategory();
    console.log(categoryData);
  };
  // getCategoryData();
  return <div>我是移动端</div>;
};
