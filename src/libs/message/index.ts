import { h, render } from "vue";
import Message from "./index.vue";
type IMessageType = "success" | "error" | "warn";
export function message(type: IMessageType, content: string): void;
/**
 *
 * @param type 类型
 * @param content 文本内容
 * @param duration 展示动画 ms
 * @returns
 */
export function message(type: IMessageType, content: string, duration = 3000) {
  const destroy = () => {
    render(null, document.body);
  };
  const vnode = h(Message, {
    type,
    content,
    duration,
    destroy
  });
  render(vnode, document.body);
}
