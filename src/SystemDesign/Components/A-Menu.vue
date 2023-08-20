<template>
    <div>
      
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        style="width: auto"
        @click="HandleClick"
      >
      <!--  v-model:openKeys="openKeys"  	当前展开的 SubMenu 菜单项 key 数组 -->
        <a-menu-item key="1"> 
          Navigation One
        </a-menu-item>
        <a-menu-item key="2">
          Navigation Two
        </a-menu-item>
        <a-menu-item key="3">
            Navigation 3
          </a-menu-item>
          <a-menu-item key="4">
            Navigation 4
          </a-menu-item>
        
      </a-menu>
    </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
selectedKeys: [''],
});

function HandleClick(MenuInfo){
    console.log(MenuInfo);
    console.log(state.selectedKeys);
};






</script>
  