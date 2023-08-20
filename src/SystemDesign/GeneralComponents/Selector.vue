<!-- 
    option的数据格式
    Array类型,元素是obj
    obj包含三个键
    value实际值
    label现在在下拉选项中内容
    diabled:默认为false

 -->


<template>
    <a-space>
        <a-select
          ref="select"
          v-model:value="value1"
          style="width: 240px"
          :options="Options"
          @focus="focus"
          @change="handleChange"
        ></a-select>
      </a-space>
</template>




<script setup>
import {ref,inject,watch} from 'vue';

const props = defineProps({
    Options:{
        type:Array ,// 如果可能存在多个类型，则可以写成 [String,Number]
        default:[
                {value: 'jack',
                label: 'Jack1',}, 
                {value: 'lucy',
                label: 'Lucy',}, 
                {value: 'disabled',
                label: 'Disabled',
                disabled: true,},
                {value: 'yiminghe',
                label: 'Yiminghe'},
                {value: 'yiminghe1',
                label: 'Yiminghe1'},
                ],
        required: false// 是否必传 ，在不声明为true 的情况下，所有prop 默认为非必填。
        },
    DefaultValue:{
        type:[String,Number,],
        default:null,
        required:false,
    }

});





const emit = defineEmits(["selected_value"]); 


const value1=ref('');

if(props.DefaultValue != null)
{
    console.log('props.DefaultValue from parent:',props.DefaultValue);
    value1.value=props.DefaultValue;
    console.log('value1.value',value1.value);
}
else
{
    console.log('no default value set');
    value1.value=props.Options[0].value;
}




// 进入
const focus = () => {
        console.log('focus');
    };


// 下面这个函数保证一开始加载时就能传递初始值
emit('selected_value',value1.value);
const handleChange = value => {
    console.log(`selected ${value}`);
    
    console.log("handl change,value1.value",value1.value);
    emit('selected_value',value1.value);
    console.log('emitted');
    

};


</script>