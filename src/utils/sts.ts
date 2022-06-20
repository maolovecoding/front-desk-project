import OSS from "ali-oss";
import { getSts } from "@/api";
/**
 * 获取oss token 进行图片上传
 * @returns
 */
export const getOSSClient = async () => {
  const {
    Credentials: { AccessKeyId, AccessKeySecret, SecurityToken }
  } = await getSts();
  return new OSS({
    // bucket所在区域 存储桶
    region: "oss-cn-beijing",
    bucket: "imooc-front",
    // id
    accessKeyId: AccessKeyId,
    // secret
    accessKeySecret: AccessKeySecret,
    // token
    stsToken: SecurityToken,
    // 刷新token
    async refreshSTSToken() {
      const {
        Credentials: { AccessKeyId, AccessKeySecret, SecurityToken }
      } = await getSts();
      return {
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken
      };
    },
    refreshSTSTokenInterval: 5 * 1000
  });
};
