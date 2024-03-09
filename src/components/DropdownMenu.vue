<script setup>
const props = defineProps({
  drinkMenu: Object,
  searchActiveMenuList: Object,
})

const emit = defineEmits([
  'selectMenuItem',
])

const selectMenuItem = (params) => {
  emit('selectMenuItem', params)
}

const isMenuListActive = (key) => {
  return props.searchActiveMenuList.set.has(key)
}
</script>

<template>
  <ul>
    <li
      v-for="menu in drinkMenu"
      :key="menu.key"
      :class="{ 'bg-[#808080]': isMenuListActive(menu.key) }"
    >
      <div 
        class="pl-4 py-2"
        :class="{ 'text-[#FDFE0F]': isMenuListActive(menu.key) }"
        @click.stop="selectMenuItem(menu)"
      >
        {{ menu.text }}
      </div>
      <div 
        v-show="menu.children && isMenuListActive(menu.key)" 
        class="pl-4"
      >
        <DropdownMenu 
          :drinkMenu="menu.children"
          :searchActiveMenuList="searchActiveMenuList"
          @selectMenuItem="selectMenuItem"
        />
      </div>
    </li>
  </ul>
</template>