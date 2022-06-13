import { FunctionalComponent } from "vue";
import { useRouter } from "vue-router";
import HeaderMy from "./headerMy";
import HeaderSearch from "./headerSearch";
import HeaderTheme from "./headerTheme";
import Logo from "@/assets/logo.png";
const Header: FunctionalComponent = () => {
  const router = useRouter();
  const onToHome = () => {
    router.push("/");
  };
  return (
    <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
      <div class="flex items-center">
        <img class=" h-4 cursor-pointer mr-2" src={Logo} onClick={onToHome} />
        <HeaderSearch class="mr-1" />
        <HeaderTheme class="mr-1" />
        <HeaderMy />
      </div>
    </div>
  );
};
export default Header;