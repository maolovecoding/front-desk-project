<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from "./components/navigation";
import List from "./components/list/index.vue";
</script>
