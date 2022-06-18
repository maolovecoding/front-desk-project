/**
 *
 * @param title 标题
 * @param content 内容
 * @param cancelText 取消文本
 * @param confirmText 确认文本
 */
import { h, render } from "vue";
import Confirm from "./index.vue";
export function confirm(content: string): Promise<unknown>;
export function confirm(
  title: string,
  content?: string,
  cancelText?: string,
  confirmText?: string
) {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = "";
    }
    // 关闭回调
    const closeHandler = () => {
      // 把渲染的vnode卸载
      render(null,document.body)
    };
    const cancelHandler = () => {
      reject(new Error("取消按钮点击！"))
    };
    const confirmHandler = () => {
      resolve(null)
    };
    // 生成 vnode
    const vnode = h(Confirm, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      closeHandler
    });
    // 渲染
    render(vnode, document.body);
  });
}
