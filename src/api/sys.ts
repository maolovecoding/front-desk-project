import request from "./base";
/**
 * 人类行为验证
 * @param data
 * @returns
 */
export const getCaptcha = (data: any) => {
  return request.post<boolean>({
    url: "/sys/captcha",
    data
  });
};
/**
 * 登录
 */
export const login = (data: ILoginParams) => {
  return request.post<{ token: string }>({
    url: "/sys/login",
    data
  });
};
/**
 * 注册
 * @param data
 * @returns
 */
export const register = (data: IRegisterParams) => {
  return request.post<any>({
    url: "/sys/register",
    data
  });
};
/**
 * 获取用户信息
 * @returns
 */
export const getProfile = () => {
  return request.get<IUserProfile>("/user/profile");
};
/**
 * 更新用户信息
 * @returns
 */
export const updateProfile = (data: IUserProfile) => {
  return request.put({
    url: "/user/profile",
    data
  });
};
/**
 * 获取 oss 阿里云的 上传凭证
 * @returns
 */
export const getSts = () => {
  return request.get<IOSSToken>("/user/sts");
};

export interface ILoginParams {
  username: string;
  password?: string;
  loginType: "username" | "QQ" | "WX";
  // QQ登录时必须传递的数据
  accessToken?: string;
  // 微信登录必须传递的参数
  openid?: string;
  // 微信登录 传递
  nickname?: string;
  // 微信登录 传递
  headimgurl?: string;
}
export interface IRegisterParams {
  username: string;
  password?: string;
  reqType?: "QQ" | "WX";
  // QQ注册必须传递的数据
  accessToken?: string;
  // QQ注册必选
  figureurl_qq_2?: string;
  // 微信登录必须传递的参数
  openid?: string;
  // 微信登录 传递
  nickname?: string;
  // 微信登录 传递
  headimgurl?: string;
}

export interface IUserProfile {
  qqOpenId: string;
  wxOpenId: string;
  nickname: string;
  title: string;
  company: string;
  homePage: string;
  introduction: string;
  vipLevel: number;
  regTime: Date;
  avatar: string;
  outTradeNo: string;
  payResult: boolean;
  _id: string;
  username: string;
  __v: number;
}

export interface AssumedRoleUser {
  Arn: string;
  AssumedRoleId: string;
}

export interface Credentials {
  SecurityToken: string;
  AccessKeyId: string;
  AccessKeySecret: string;
  Expiration: Date;
}
/**
 * 阿里云上传凭证返回数据类型
 */
export interface IOSSToken {
  RequestId: string;
  AssumedRoleUser: AssumedRoleUser;
  Credentials: Credentials;
}
