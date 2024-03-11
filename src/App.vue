<script setup>
import { ref } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'
import NineSquare from './components/NineSquare.vue';
import FourBallAnimation from './components/FourBallAnimation.vue';

const isSideBarOpen = ref(false)

const toggleSideBar = (params = null) => {
  if (params) isSideBarOpen.value = params
  else isSideBarOpen.value = !isSideBarOpen.value
}
</script>

<template>
  <div class="relative flex flex-col overflow-hidden w-screen h-screen bg-gray-300">
    <HeaderBar @toggleSideBar="toggleSideBar" />
    <div class="w-full h-full grid place-items-center overflow-y-scroll">
      <NineSquare />
    </div>
    <SideBar :isSideBarOpen="isSideBarOpen" @toggleSideBar="toggleSideBar" />
    <FourBallAnimation />
  </div>
</template>
