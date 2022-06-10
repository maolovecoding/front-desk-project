import request from "./base";

export const getCategory = <T = any>() => {
  return request.get<T>("/category");
};
