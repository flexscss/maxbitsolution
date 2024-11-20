<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    <div class="sm:order-2">
      <h1 class="text-2xl font-bold mb-3">
        {{ item.strDrink }}
      </h1>
      <ul class="my-3">
        <li
          v-for="tag in mainTags"
          :key="tag"
        >
          {{ item[tag] }}
        </li>
      </ul>
      <h2 class="text-xl font-bold my-3">
        Instructions
      </h2>
      <p class="my-3 text-sm">
        {{ item.strInstructions }}
      </p>
      <h2 class="text-xl font-bold my-3">
        Ingredients
      </h2>
      <ul class="flex flex-wrap gap-2 my-3">
        <li
          v-for="ingredient in ingredients"
          :key="ingredient"
          class="inline-flex border border-gray-200 py-1 px-3 rounded-md"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="px-2 lg:px-6 sm:order-1 md:order-2 sm:px-0">
      <Image
        :src="item.strDrinkThumb"
        :alt="item.strDrink"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cocktail } from '@/stores/cocktails'
import Image from '@/components/ui/Image.vue'
import { computed } from 'vue'

const props = defineProps<{
  item: Cocktail
}>()

const mainTags = computed(() => {
  return ['strCategory', 'strAlcoholic', 'strGlass']
})

const ingredients = computed(() => {
  return Object.keys(props.item).reduce((acc, key) => {
    if (key.startsWith('strIngredient') && props.item[key]) {
      acc.push(props.item[key])
    }
    return acc
  }, [] as string[])
})
</script>
