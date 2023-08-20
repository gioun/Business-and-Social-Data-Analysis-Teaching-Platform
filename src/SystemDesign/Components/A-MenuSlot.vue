<template>
    <div>
      
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        style="width: auto"
        @click="HandleClick"
      >
        <slot></slot>
      </a-menu>
    </div>
</template>


<script setup>
import { reactive, toRefs } from 'vue';


const state = reactive({
selectedKeys: [''],
});




const Emit=defineEmits(['SelectedItemKey']);

function HandleClick(MenuInfo){
    console.log(MenuInfo);
    console.log(state.selectedKeys);
    Emit('SelectedItemKey',MenuInfo.key);
    
};







</script>