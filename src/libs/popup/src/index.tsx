import {
  defineComponent,
  FunctionalComponent,
  Teleport,
  Transition
} from "vue";
import "./index.scss";
// 弹出窗口组件
const Popup: FunctionalComponent = ({}, { slots, attrs }) => {
  return (
    <div>
      <Teleport to="body">
        {() => (
          <>
            {/* 蒙版 */}
            <Transition name="fade">
              <div class=" w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" />
            </Transition>
            {/* 内容 */}
            <Transition name="popup-down-up">
              <div {...attrs} class="w-screen bg-white z-50 fixed bottom-0">
                {/* 默认插槽 */}
                {slots.default?.()}
              </div>
            </Transition>
          </>
        )}
      </Teleport>
    </div>
  );
};
export default defineComponent({
  setup(props, { slots, attrs }) {
    return () => {
      return (
        <div>
          <Teleport to="body">
            {() => (
              <>
                {/* 蒙版 */}
                <Transition name="fade">
                  <div class=" w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" />
                </Transition>
                {/* 内容 */}
                <Transition name="popup-down-up">
                  <div {...attrs} class="w-screen bg-white z-50 fixed bottom-0">
                    {/* 默认插槽 */}
                    {slots.default?.()}
                  </div>
                </Transition>
              </>
            )}
          </Teleport>
        </div>
      );
    };
  }
});
