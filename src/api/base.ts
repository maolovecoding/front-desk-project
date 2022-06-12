import { ICODE } from "@/constants";
import { Request } from "@/utils";
const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: config => {
      // 携带token
      // 携带code
      config!.headers!.icode = ICODE;
      return config;
    },
    responseInterceptor(res) {
      // 这里的res是请求成功后 axios包装过一层的数据
      return res.data;
    }
  }
});

export default request;
