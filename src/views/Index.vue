<template>
  <div class="p-4 lg:p-8">
    <CocktailVariantItem
      v-for="variant in cocktail"
      :key="variant.idDrink"
      :item="variant"
      class="pb-6 mb-6 border-b border-zinc-200/70 last:border-b-0"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import CocktailVariantItem from '@/components/coctailView/CocktailVariantItem.vue'
import { useCocktailStore } from '@/stores/cocktails'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useCocktailStore()
const route = useRoute()

const cocktail = computed(() => store.getCocktail(route.params.cocktail_code as string))
</script>

<script lang="ts">
async function loadPage(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useCocktailStore()
  const cocktailCode = to.params.cocktail_code as string
  if (!cocktailCode) {
    const firstAvailableCocktailCode = store.getFirstAvailableCocktailCode()
    next({ name: 'cocktail', params: { cocktail_code: firstAvailableCocktailCode } })
    return
  }

  if (!store.isValidCocktailCode(cocktailCode)) {
    next({ name: 'not-found' })
    return
  }

  const cocktails = await store.fetchCocktail(cocktailCode)
  if (cocktails.length === 0) {
    next({ name: 'not-found' })
    return { name: 'not-found' }
  }
  next()
}

export default {
  beforeRouteUpdate: loadPage,
  beforeRouteEnter: loadPage
}
</script>
