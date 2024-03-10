<script setup>
import { ref, reactive } from 'vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownSelect from './DropdownSelect.vue'
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

const drinkMenuList = JSON.parse(JSON.stringify(drinkMenu));
const handleMenuList = (list, level = 0) => {
  for (let i = 0; i < list.length; i++) {
    list[i].level = level
    if (list[i].children?.length > 0) {
      handleMenuList(list[i].children, level + 1)
    }
  }
  return list
}

const preKey = ref('')
const activeMenuList = reactive([])
const searchActiveMenuList = reactive({ set: new Set() }) // 同 activeMenuList，搜尋用 Set.has

const selectMenuItem = (params) => {
  // 避免重覆觸發
  if (hasSameClicked(params)) return

  const hasClickedSameLevel = activeMenuList.length === params.level + 1
  const hasClickedPreLevel = activeMenuList.length > params.level

  if (hasClickedSameLevel) activeMenuList.pop()
  else if (hasClickedPreLevel) activeMenuList.length = params.level

  activeMenuList.push(params.key)
  searchActiveMenuList.set = new Set(activeMenuList)
}

const selectSelectItem = (params) => {
  if (hasSameClicked(params)) return

  activeMenuList.length = 0
  activeMenuList.push(...params.allKey.split('-'))
  searchActiveMenuList.set = new Set(activeMenuList)
}

const hasSameClicked = (params) => {
  let sameClick = params.key === preKey.value
  preKey.value = params.key
  return sameClick
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
      :drinkMenu="handleMenuList(drinkMenuList)"
      :searchActiveMenuList="searchActiveMenuList"
      @selectMenuItem="selectMenuItem" 
    />
    <DropdownSelect
      :drinkMenu="drinkMenu"
      @selectSelectItem="selectSelectItem"
    />
  </div>
</template>
