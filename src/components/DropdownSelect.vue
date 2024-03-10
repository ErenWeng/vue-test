<script setup>
import { ref, reactive, computed } from 'vue'
import drinkMenu from '../mock/drinkMenu';

const props = defineProps({
  drinkMenu: Object,
})

const emit = defineEmits([
  'selectSelectItem',
])

const drinkFlatList = reactive({ map: new Map()})
const selectedDrinkItem = ref('')

const handleSelectList = (list, name = '', preAllKey = '') => {
  for (let i = 0; i < list.length; i++) {
    const { key, text } = list[i]
    let longName, allKey
    if (!name) {
      longName = text
      allKey = key
    } else {
      longName =`${name} > ${text}`
      allKey = `${preAllKey}-${key}`
    }

    drinkFlatList.map.set(key, { text, name: longName, allKey })
    if (list[i].children?.length > 0) {
      handleSelectList(list[i].children, longName, allKey)
    }
  }
}
handleSelectList(drinkMenu)

const selectSelectItem = () => {
  let itemData = drinkFlatList.map.get(selectedDrinkItem.value)
  let params = {
    key: selectedDrinkItem.value,
    allKey: itemData.allKey,
    text: itemData.text,
  }
  emit('selectSelectItem', params)
}

const selectedDrinkItemName = computed(() => {
  let data = drinkFlatList.map.get(selectedDrinkItem.value)
  return data?.text || ''
})
</script>

<template>
  <hr />
  <div class="py-4">目前的 select：{{ selectedDrinkItemName }}</div>
  <div class="px-2">
    <select 
      v-model="selectedDrinkItem" 
      class="min-h-15 text-gray-800 w-full"
      @change="selectSelectItem"
    >
      <option value="" class="hidden">請選擇</option>
      <option
        v-for="menu in drinkFlatList.map"
        :key="menu[0]"
        :value="menu[0]"
      >
        {{ menu[1].name }}
      </option>
    </select>
  </div>
</template>