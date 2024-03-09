<script setup>
defineProps({
  isBoxActive: Boolean,
})
</script>

<template>
  <div 
    class="h-full bg-[radial-gradient(rgba(113,81,95,1)_81%,rgba(0,0,0,1)_100%)]"
    :class="{ 'animate-box-flash': isBoxActive }"
  >
  </div>
</template>