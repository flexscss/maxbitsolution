<template>
  <div ref="imageContainer">
    <div
      v-if="isLoading || hasError"
      class="relative w-full h-[250px] flex items-center justify-center
    bg-zinc-100 rounded-lg"
    >
      <div v-if="isLoading">
        <div
          class="w-8 h-8 border-4 border-gray-300 border-t-4
        border-t-blue-500 rounded-full animate-spin"
        />
      </div>
      <div v-if="hasError">
        <span>Failed to load image</span>
      </div>
    </div>

    <img
      v-show="!isLoading && !hasError"
      :src="loadedSrc"
      :alt="alt"
      class="w-full object-contain rounded-lg"
      @load="onImageLoad"
      @error="onImageError"
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  src: string
  alt?: string
}

const props = defineProps<Props>()

const imageContainer = ref<HTMLElement | null>(null)
const loadedSrc = ref<string>('')
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
let observer: IntersectionObserver | null = null

function loadImage() {
  isLoading.value = true
  hasError.value = false
  loadedSrc.value = props.src
}

function onImageLoad() {
  isLoading.value = false
  hasError.value = false
}

function onImageError() {
  isLoading.value = false
  hasError.value = true
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        loadImage()
        observer?.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (imageContainer.value) {
    observer.observe(imageContainer.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
