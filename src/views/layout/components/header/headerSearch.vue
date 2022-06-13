<template>
  <div class="w-full">
    <Search v-model="inputValue">
      <template #dropdown>
        <div>
          222
        </div>
      </template>
    </Search>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@/libs";
const inputValue = ref("");
</script>
