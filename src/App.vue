<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <TransitionRouterView
      :routerType="store.routerTypeGetter"
      mainComponentName="home" />
  </div>
</template>

<script setup lang="ts">
import { TransitionRouterView } from "@/libs";
import { appStore } from "@/store/pinia";
const store = appStore();
</script>
