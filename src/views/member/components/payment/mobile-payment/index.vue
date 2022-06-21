<template>
  <div
    class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden">
    <!-- 特惠提示 -->
    <Discounts></Discounts>
    <!-- 支付 -->
    <div class="flex justify-between text-xs px-1 py-0.5">
      <div class="text-left text-zinc-900 dark:text-zinc-200">
        <p class="">
          券后合计：<span class="text-red-600 text-[16px] font-sans font-medium"
            >￥</span
          ><span class="text-red-600 text-[22px] font-sans font-medium">9</span>
        </p>
        <p class="text-red-600">优惠券：限时立减 ￥10</p>
      </div>
      <Button @click="handlePayClick" class="w-[120px]" :isActiveAnim="false"
        >立即开通</Button
      >
    </div>
    <!-- TODO: popup -->
    <Popup class="rounded-t" v-model="isOpenPopup">
      <MobilePaySelect />
    </Popup>
  </div>
</template>
<script setup lang="ts">
import { Button, Popup } from "@/libs";
import { ref } from "vue";
import Discounts from "../discounts.vue";
import MobilePaySelect from "./mobile-pay-select.vue";
const isOpenPopup = ref(false);
const handlePayClick = () => {
  isOpenPopup.value = !isOpenPopup.value;
};
</script>
