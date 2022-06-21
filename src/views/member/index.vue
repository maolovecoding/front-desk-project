<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
      <!-- 移动端 navbar 处理 -->
      <Navbar v-if="isMobileTerminal" sticky :clickLeft="handleNavbarLeftClick">
        精选会员
      </Navbar>

      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600">
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <PayMenuItem
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData?.id"
            :data="item"
            @click="handleChangeCurrentPay"></PayMenuItem>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData?.desc }}</p>
        <!-- 支付 -->
        <Payment class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getVIPPayList, IVIPPay } from "@/api";
import { isMobileTerminal } from "@/utils";
import Navbar from "@/libs/navbar/index.vue";
import PayMenuItem from "./components/pay-menu-item.vue";
import { useRouter } from "vue-router";
import { appStore } from "@/store/pinia";
import Payment from "./components/payment/index.vue";
const vipPayListData = ref<IVIPPay[]>([]);
const currentPayData = ref<IVIPPay>();
const getVIPPayListData = async () => {
  const res = await getVIPPayList();
  currentPayData.value = res[0];
  vipPayListData.value = res;
};
getVIPPayListData();
const router = useRouter();
/**
 * 移动端后退
 */
const handleNavbarLeftClick = () => {
  appStore().routerType = "back";
  router.back();
};
const handleChangeCurrentPay = (data: IVIPPay) => {
  currentPayData.value = data;
};
</script>

<style scoped></style>
