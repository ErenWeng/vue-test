# Vue-test

## 規格

- Vue 版本：3.4.19
- Vite 版本：5.1.4
- Tailwind CSS 版本：3.4.1

## 主頁面九宮格動畫
1. 請使用兩種以上的動畫執行方式，來繪製動畫：

    在專案中使用了以下幾種方式做動畫的繪製：
     - CSS 的 Keyframe Animations：九宮格中球的向右移動及格子的閃爍。
     - Javascript 的屬性 style ：四顆球動畫。
     - Vue 的 Transition tag：DropdownMenu 點選項目時的動畫。

2. 四顆球同時朝同一個座標點移動：
    
    利用 Javascript 的屬性 style 去更改原本 top / left 的位置，讓多個組件朝同一座標點集合。

3. 請在效能考量下，設計可同時存在一百顆球、且指定飛行起終點的結構：

    如果要處理大量或複雜的動畫效果時，考量到效能，用 Canvas 配合 Javascript 繪製動畫會是比較好的。

## 側邊選單

1. 另提供一個下拉選單，需包含所有種類。從下拉選單中選取任一項目時，等同點擊該項目：

    在 DropdownSelect.vue 中，在初始化資料時利用 handleSelectList() 遞迴遍歷每個項目，並以 Map 的形式儲存，同時也塞入需要顯示的 name 及用來紀錄從父層到目前整串 key 的 allKey。

    點擊下拉選單的項目後，經由 selectSelectItem() 處理資料，利用 length = 0 直接清空原本用來紀錄選單的 activeMenuList，並且塞入 allKey 來同步上面的 DropdownMenu 選單。

2. 請實作記憶功能，關閉分頁後再開啟，可以顯示上次選取的項目：

    在初始資料遍歷時，檢查 localStorage 是否有紀錄最後點擊的 key，並且經由 allKey 去查找 Map 對應的資料，並將資料處理成適當的值後，將值送至觸發點選的 function 已回復到重整之前的狀態。
    
    也要記得在每次點選 Menu 時將 key 存回 localStorage。

3. 請在效能考量下，設計可收合、展開最多一百層的選單：

    在組件方面，組件層級過多且重覆時，可以使用嵌套組件擴展到多層次的結構，減少重覆運算 DOM 以提升效能。
    
    在做資料處理方面，以目前的 Menu 來說就有四層結構，用迴圈寫就需要三次 for 迴圈O(n^3)，然而使用遞迴只需要 O(n)，所以以多層次的選單來說，使用遞迴會是效能比較好的方式。

    在做選單的資料搜尋，則使用了 Set、Map 這兩種 O(1) 的方式來提升效能。