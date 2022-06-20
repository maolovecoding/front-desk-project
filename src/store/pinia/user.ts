import { defineStore } from "pinia";
import {
  login,
  ILoginParams,
  getProfile,
  IUserProfile,
  IRegisterParams,
  register
} from "@/api";
import md5 from "md5";
import { message } from "@/libs";

const user = defineStore("user", {
  state: () => ({
    token: "",
    // 用户信息
    userInfo: {} as IUserProfile
  }),
  actions: {
    // 注册
    async registerAction(payload: IRegisterParams) {
      // 密码加密
      const { password } = payload;
      const res = await register({
        ...payload,
        password: password ? md5(password) : ""
      });
      return res;
    },
    async loginAction(payload: ILoginParams) {
      // 密码加密
      const { password } = payload;
      const { token } = await login({
        ...payload,
        password: password ? md5(password) : ""
      });
      this.token = token;
      // 获取用户信息
      this.getUserDetailAction();
    },
    async getUserDetailAction() {
      const res = await getProfile();
      console.log(res);
      this.userInfo = res;
      // 登录成功
      message(
        "success",
        `欢迎您 ${res.vipLevel ? "尊贵的VIP " + res.vipLevel + " 用户" : ""}${
          res.nickname
        }`,
        6000
      );
    },
    // 退出登录
    logout() {
      this.token = "";
      this.userInfo = {} as IUserProfile;
      // 刷新页面
      location.reload();
    },
    // 修改 userInfo的值
    setUserInfo(newUserInfo: IUserProfile) {
      this.userInfo = newUserInfo;
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: "user" }]
  }
});
export default user;
