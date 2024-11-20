<template>
  <div
    class="container grid sm:grid-cols-1 md:grid-cols-12 lg:my-6 rounded-xl
    min-h-screen lg:min-h-[calc(100vh-48px)] bg-white md:my-0"
  >
    <Sidebar class="col-span-3" />
    <div class="col-span-9">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/fragments/Sidebar.vue'
</script>
