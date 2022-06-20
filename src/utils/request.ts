import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 定义接口，里面可以传入参数，也就是axios的拦截器函数
 */
interface RequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
/**
 * 对 AxiosRequestConfig 的请求配置接口做出拓展
 * 可以传递拦截器，供请求对象使用
 * @interface RequestConfig
 * @extends {AxiosRequestConfig}
 * @template T
 */
interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptor<T>;
  showLoading?: boolean;
}

class Request {
  private instance: AxiosInstance;
  private interceptors?: RequestInterceptor;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // TODO  注意：请求拦截器是先添加的后执行，后添加的先执行 有点像 f(g(x)) 符合函数的味道。响应拦截器就是按照顺序了。
    // 注册拦截器
    this.registerInterceptor();
    this.registerGlobalInterceptor();
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 当前请求配置了请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 显示加载请求动画

      // 发起请求
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 当前请求的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res);
          }
          // 还原默认值

          // 返回响应数据
          resolve(res);
        })
        .catch(reason => {
          // 还原默认值
          reject(reason);
        });
    });
  }
  get<T>(config: RequestConfig<T>): Promise<T>;
  get<T>(url: string): Promise<T>;
  get<T>(config: RequestConfig<T> | string) {
    if (typeof config === "string") {
      return this.request<T>({ url: config, method: "GET" });
    } else return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  put<T>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: "PUT" });
  }

  /**
   *
   * 注册 实例 拦截器的方法
   * @private
   * @memberof Request
   */
  private registerInterceptor() {
    // 注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  /**
   * 注册全局的拦截器 对每个实例都生效
   *
   * @memberof Request
   */
  registerGlobalInterceptor() {
    this.instance.interceptors.request.use(
      config => {
        // 加载动画等
        return config;
      },
      error => error
    );
    this.instance.interceptors.response.use(
      res => {
        // 这里的res已经是真实数据 但是有用的数据在该对象的data里面
        const { success, data, message } = res as any as IResponse<any>;
        if (success) return data;
        // 业务请求错误
        return Promise.reject(new Error(message));
      },
      error => {
        // 处理token超时
        if (error?.response.data?.code === 401) {
          // /退出登录
        }
        return Promise.reject(error);
      }
    );
  }
}

export default Request;

interface IResponse<T> {
  code: number;
  data: T;
  message: "string";
  success: boolean;
}
