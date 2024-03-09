<script setup>
import { ref, reactive } from 'vue'
import NineSquareBox from './NineSquareBox.vue';
import NineSquareBall from './NineSquareBall.vue';

const boxCount = ref(9)
const activeBoxList = reactive([3,5,9])
const isBoxActive = (params) => {
  return activeBoxList.includes(params)
}

const activeBallList = reactive([1,3,7,9])
const isBallActive = (params) => {
  return activeBallList.includes(params)
}
</script>

<template>
  <div class="w-full overflow-x-hidden grid grid-rows-3 grid-cols-3 gap-1 p-1">
    <div
      v-for="(box, boxIndex) in boxCount" 
      :key="box"
      class="relative h-[100px] border-[2px] border-black"
    >
      <div 
        :class="{ 'animate-ball-scroll': isBallActive(boxIndex + 1) }"
        class="absolute inset-0 z-[1] m-auto grid place-items-center"
      >
        <NineSquareBall v-if="isBallActive(boxIndex + 1)" />
      </div>
      <div class="absolute inset-0 z-0">
        <NineSquareBox :isBoxActive="isBoxActive(boxIndex + 1)"/>
      </div>
    </div>
  </div>
</template>
