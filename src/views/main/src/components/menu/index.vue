<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 py-1 dark:text-zinc-200">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
        v-for="(category, index) in store.categories"
        :key="category.id"
        @click="$emit('onItemClick', category)">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { categoryStore } from "@/store/pinia";
import { ICategory } from "../navigation/type";
const store = categoryStore();
defineEmits<{
  (e: "onItemClick", category: ICategory): void;
}>();
</script>
