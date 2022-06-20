<template>
  <div class="overflow-auto flex flex-col items-center">
    <SvgIcon
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      name="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="handleCloseClick" />

    <img :src="blob" ref="imageRef" />
    <Button
      :type="TypeEnum.main"
      :size="SizeEnum.default"
      class="mt-4 w-[80%] xl:w-1/2"
      :isLoading="loading"
      @click="handleConfirmClick"
      >确定</Button
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { SvgIcon, Button, TypeEnum, SizeEnum, message } from "@/libs";
import { isMobileTerminal, getOSSClient } from "@/utils";
import OSS from "ali-oss";
import { userStore } from "@/store/pinia";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateProfile } from "@/api";
const store = userStore();
defineProps<{
  blob: string;
}>();
const emits = defineEmits<{
  (e: "close"): void;
}>();
const loading = ref(false);
const imageRef = ref<HTMLImageElement>();
const handleCloseClick = () => {
  emits("close");
};
const handleConfirmClick = () => {
  loading.value = true;
  //拿到裁减后的图片
  cropper
    // 拿到canvas
    .getCroppedCanvas()
    // 转为blob 但是需要转为可以看见的url
    .toBlob(blob => {
      // 上传
      putObjectToOSS(blob!);
    });
};
let ossClient: OSS;
/**
 * 进行图片上传
 */
const putObjectToOSS = async (file: Blob) => {
  if (!ossClient) {
    ossClient = await getOSSClient();
  }
  try {
    const fileTypeArr = file.type.split("/");
    const filename = `${store.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`;
    // 文件上传 1. 存放的路径（包含名称）
    // 2. file
    const res = await ossClient.put(`images/${filename}`, file);
    // 图片地址在上传成功的返回值的url里面
    changeProfile(res.url);
  } catch (error) {
    message("error", "上传失败！请稍后重试");
  }
};
/**
 * 上传新头像到服务器
 */
const changeProfile = async (avatar: string) => {
  // 更新本地数据
  store.setUserInfo({
    ...store.userInfo,
    avatar
  });
  try {
    // 更新服务器数据
    await updateProfile(store.userInfo);
    message("success", "头像更新成功！");
  } catch (error) {
    message("error", "头像更新失败！");
  } finally {
    loading.value = false;
    emits("close");
  }
};
/**
 * 图片裁减
 */
let cropper: Cropper;
onMounted(() => {
  console.log(imageRef);
  cropper = new Cropper(
    imageRef.value!,
    isMobileTerminal ? mobileOptions : pcOptions
  );
});
// pC端
const pcOptions = {
  // 宽高比 1
  aspectRatio: 1
};
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: "move",
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
};
</script>

<style scoped></style>
