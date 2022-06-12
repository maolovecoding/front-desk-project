<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 py-1">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
        v-for="(category, index) in categories"
        :key="category.id"
        @click="$emit('onItemClick', index)">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { ICategory } from "../navigation/type";
defineProps<{
  categories: ICategory[];
}>();
defineEmits<{
  (e: "onItemClick", index: number): void;
}>();
</script>
