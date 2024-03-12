<script setup>
import { ref, reactive } from 'vue'
import NineSquareBall from './NineSquareBall.vue'

const ballRef = ref(null)
const ballList = reactive([
  { id: 1, top: 60, left: 60 },
  { id: 2, top: 120, left: 60 },
  { id: 3, top: 120, left: 120 },
  { id: 4, top: 60, left: 120 },
])

const move = () => {
  // 共同移動到指定位置 100px, 100px
  for (let i = 0; i < ballRef.value.length; i++) {
    ballRef.value[i].$el.style.top = '100px'
    ballRef.value[i].$el.style.left = '100px'
  }
}

const back = () => {
  for (let i = 0; i < ballRef.value.length; i++) {
    ballRef.value[i].$el.style.top = `${ballList[i].top}px`
    ballRef.value[i].$el.style.left = `${ballList[i].left}px`
  }
}

const ballPosition = (ball) => {
  return [`top: ${ball.top}px`, `left: ${ball.left}px`]
}
</script>

<template>
  <div class="absolute inset-0 h-screen w-screen m-auto pointer-events-none">
    <span>四顆球移動</span>
    <button class="border-[1px] border-black px-1 m-1 pointer-events-auto" @click="move">move</button>
    <button class="border-[1px] border-black px-1 m-1 pointer-events-auto" @click="back">back</button>
    <NineSquareBall 
      ref="ballRef" 
      v-for="ball in ballList" 
      :key="ball.id"
      :style="ballPosition(ball)"
      class="absolute m-auto transition-all ease-in-out duration-300"
    />
  </div>
</template>
