<script setup>
const emit = defineEmits([
  'toggleSideBar',
])

const toggleSideBar = (params) => {
  emit('toggleSideBar', params)
}
</script>

<template>
  <div class="w-screen flex bg-white">
    <button 
      class="px-3 pt-0.5 pb-0.2 m-1 ml-auto rounded border-2 border-gray-400 text-gray-600 bg-gray-200"
      @click="toggleSideBar(true)"
    >
      三
    </button>
  </div>
</template>
