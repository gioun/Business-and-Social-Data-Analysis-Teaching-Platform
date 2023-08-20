<!-- 组合式api语法糖 -->

<script setup>
// 顶层的数据会暴露给模板
import {ref} from 'vue';
// 引入后组件不再需要注册,不用export default
import children1 from './ZuHeShiApi3Children.vue';
//定义变量在模板中不需要return导出,模板可以直接使用
const counter=ref(20);
console.log(counter.value);
function counterPlus(){
    counter.value++
}


</script>

<template>
    <div>
        <h2>{{counter}}</h2>
        <button  @click="counterPlus">counter++</button>
    </div>
    <div>
        <children1></children1>
    </div>
</template>