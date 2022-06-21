<template>
  <div>
    <!-- PC -->
    <PCPayment v-if="!isMobileTerminal" />
    <!-- mobile -->
    <MobilePayment v-else />
  </div>
</template>

<script setup lang="ts">
import { isMobileTerminal } from "@/utils";
import PCPayment from "./pc-payment/index.vue";
import MobilePayment from "./mobile-payment/index.vue";
</script>

<style scoped></style>
