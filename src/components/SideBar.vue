<script setup>
import { ref, reactive } from 'vue'
import DropdownMenu from './DropdownMenu.vue'
import drinkMenu from '../mock/drinkMenu.js'

defineProps({
  isSideBarOpen: Boolean,
})

const emit = defineEmits([
  'toggleSideBar',
])

const toggleSideBar = (params) => {
  emit('toggleSideBar', params)
}

const handleList = (list, level = 0) => {
  for (let i = 0; i < list.length; i++) {
    list[i].level = level
    if (list[i].children?.length > 0) {
      handleList(list[i].children, level + 1)
    }
  }
  return list
}

const preKey = ref('')
const activeMenuList = reactive([])
const searchActiveMenuList = reactive({ set: new Set() }) // 同 activeMenuList，搜尋用 Set.has
const selectMenuItem = (params) => {
  // 避免重覆觸發
  const hasSameClicked = params.key === preKey.value
  if (hasSameClicked) return
  preKey.value = params.key

  const hasClickedSameLevel = activeMenuList.length === params.level + 1
  const hasClickedPreLevel = activeMenuList.length > params.level

  if (hasClickedSameLevel) activeMenuList.pop()
  else if (hasClickedPreLevel) activeMenuList.length = params.level
  activeMenuList.push(params.key)

  searchActiveMenuList.set = new Set(activeMenuList)
}
</script>

<template>
  <!-- mask -->
  <div 
    v-show="isSideBarOpen"
    class="w-full absolute z-[99] inset-0"
    @click="toggleSideBar(false)"
  >
  </div>
  <div 
    class="w-1/2 h-screen absolute z-[100] inset-y-0 right-0 m-auto pl-1 py-2 overflow-y-scroll bg-black bg-opacity-90 text-white transition ease-in-out duration-300"
    :class="{ 'translate-x-full': !isSideBarOpen }"
  >
    <DropdownMenu 
      :drinkMenu="handleList(drinkMenu)"
      :searchActiveMenuList="searchActiveMenuList"
      @selectMenuItem="selectMenuItem" 
    />
  </div>
</template>