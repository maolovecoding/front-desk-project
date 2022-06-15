import { IRoot, IRootState } from "./type";
import { GetterTree } from "vuex";
export default {
  // 方便访问
  categories: state => state.category.categories
} as GetterTree<IRoot, IRootState>;
