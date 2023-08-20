<script>    
export default{
    data(){
        return{
            list:[1,2,3,4,5,6]
        }
    }
}
</script>

<template>
    <div>
        <h2>-----------------插槽组件演示-----------------</h2>
        <div>
            <!-- v-slot: 使用具名插槽进行替换 -->
            <slot name="button"><button>默认按钮,在没有传入时显示</button></slot><!--插槽,占位,填充的内容由父组件决定-->
            <slot name="input"></slot>
            <slot name="h2"></slot>
            <slot name="alternative_p"><p>默认文本,在该插槽没有传入时显示</p></slot><!--插槽备用内容-->
            <slot></slot>
        </div>
        <h2>-----------------插槽组件演示结束-----------------</h2>
    </div>


    <div>
        
    </div>
</template>

<style>

</style>