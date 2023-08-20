<!-- 生命周期钩子函数演示 -->

<script> 
    export default
    {
        data() {
            return {
                msg:"nihao",
                counter:0
            }
        },
        methods: {
            
        },
        beforeCreate(){
            console.log('beforeCreate');
        },
        created() {
            console.log('Create');
        },
        beforeMount() {
            console.log('beforeMount');
        },
        mounted() {
            console.log('mounted');
        },
        beforeUpdate() {
            console.log('beforeUpdate');
        },
        updated() {
            console.log('Update');
        },
        beforeUnmount() {
            // 可以在父组件使用v-if实现
            console.log('beforeUnmounted');
        },
        unmounted() {
            console.log('unmounted');
        },
    }
</script>


<template>
    <div>
        Hello World
        <p>{{msg}}</p>
        <h2>{{counter}}</h2>
    </div>
    <button @click="msg='hello '">改变</button>
    <button @click="counter++">counter++</button>
</template>