import apiService from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Cocktail {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
  [key: string]: string | null
}

export const useCocktailStore = defineStore('cocktails', () => {
  const cocktails = ref<Map<string, Cocktail[]>>(new Map())
  const availableCocktails = ['margarita', 'mojito', 'a1', 'kir']

  const getFirstAvailableCocktailCode = () => {
    return availableCocktails[0]
  }

  const isValidCocktailCode = (code: string): boolean => {
    return availableCocktails.includes(code.toLowerCase())
  }

  const fetchCocktail = async (code: string) => {
    if (!cocktails.value.has(code)) {
      const res = await apiService.get<{ drinks: Cocktail[] | null }>(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
      )

      if (res.drinks) {
        cocktails.value.set(code, res.drinks)
      }
    }
    return cocktails.value.get(code) || []
  }

  const getCocktail = (code: string) => {
    return cocktails.value.get(code) || []
  }

  return {
    cocktails,
    availableCocktails,
    fetchCocktail,
    isValidCocktailCode,
    getCocktail,
    getFirstAvailableCocktailCode
  }
})
