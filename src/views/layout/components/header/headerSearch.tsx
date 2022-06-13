import { FunctionalComponent ,ref} from "vue";
import { Search } from "@/libs";
const HeaderSearch: FunctionalComponent = () => {
  const val = ref()
  return (
    <div class="w-full">
      <Search modelValue={val.value} />
    </div>
  );
};
export default HeaderSearch;
