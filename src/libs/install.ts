import { App } from "vue";
import SvgIcon from "./svg-icon";

export default {
  install(app: App) {
    app.use(SvgIcon);
  }
};
