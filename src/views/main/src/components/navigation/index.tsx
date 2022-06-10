import { defineComponent } from "vue";
import { isMobileTerminal } from "@/utils";
import Mobile from "./mobile";
// import PC from "./pc";
export default defineComponent({
  setup() {
    return () => {
      return <div>{isMobileTerminal ? <Mobile /> : null}</div>;
    };
  }
});
