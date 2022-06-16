<template>
  <div>
    <Header class="h-header" />
    <div class="h-main">
      <Main />
    </div>
    <Floating />
  </div>
</template>

<script setup lang="ts">
import Floating from "./components/floating";
import Header from "./components/header";
import Main from "./components/main/index.vue";
</script>

<style scoped></style>
