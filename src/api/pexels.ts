import request from "./base";

/**
 * 从 pexels网站获取接口图片数据
 */
export const getPexelsList = (params: IParams) => {
  return request.get<IResponse>({
    url: "/pexels/list",
    params
  });
};
/**
 * 获取搜索提示
 * @param q 关键字
 */
export const getSearchHint = (q: string) => {
  return request.get<{ total: number; result: string[] }>({
    url: "/pexels/hint",
    params: {
      q
    }
  });
};

export interface IParams {
  page: number;
  size: number;
  categoryId?: string;
}

export interface IResponse {
  list: IPexelsList[];
  page: string;
  size: string;
  total: number;
}
export interface IPexelsList {
  tags: string[];
  _id: string;
  photoLink: string;
  photo: string;
  authorLike: string;
  avatar: string;
  author: string;
  photoDownLink: string;
  id: string;
  title: string;
  photoWidth: number;
  photoHeight: number;
  photoType: string;
  __v: number;
}
