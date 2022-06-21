import request from "./base";

export const getVIPPayList = () => {
  return request.get<IVIPPay[]>("/user/vip/pay/list");
};

export interface IVIPPay {
  id: number;
  title: string;
  desc: string;
  oldPrice: string;
  price: string;
  isHot: boolean;
}
