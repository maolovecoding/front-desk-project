import { defineComponent, reactive, FunctionalComponent } from "vue";

const Test: FunctionalComponent<{ name: string }> = (props, { slots }) => {
  return (
    <div>
      {slots.default?.()}
      <h3>我是Test,{props.name}</h3>
    </div>
  );
};
const App = defineComponent({
  setup() {
    const list = reactive(["A", "B", "C"]);
    return () => {
      return (
        <div>
          <h2>你好</h2>
          <button class="bg-sky-700" onClickOnce={() => list.push("D")}>
            按钮+1
          </button>
          <ul>
            {list.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <Test name="张三">{() => <div>我是插槽 aaa</div>}</Test>
        </div>
      );
    };
  }
});

export default App;
