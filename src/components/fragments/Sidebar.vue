<template>
  <div class="p-4 lg:p-8 border-r border-zinc-200">
    <RouterLink
      v-for="cocktail in availableCocktails"
      :key="cocktail"
      :to="`/${cocktail}`"
      class="block first-letter:uppercase text-lg mb-2 last:mb-0
      py-2 px-4 rounded-md hover:bg-zinc-50 hover:text-blue-500"
    >
      {{ cocktail }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useCocktailStore } from '@/stores/cocktails'
import { computed } from 'vue'

const store = useCocktailStore()
const availableCocktails = computed(() => store.availableCocktails)
</script>

<style scoped lang="postcss">
.router-link-active {
  @apply text-blue-600 bg-blue-50;
}
</style>
