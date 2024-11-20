<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'
import ErrorLayout from './ErrorLayout.vue'

const route = useRoute()

type Layout = 'default' | 'error'
const layouts = {
  default: DefaultLayout,
  error: ErrorLayout
}

const layout = computed(() => {
  const layoutName = route.meta.layout || 'default'
  return layouts[layoutName as Layout]
})
</script>
