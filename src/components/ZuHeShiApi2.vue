<!-- 组合式api2,setup引入watch,computed,props,context,provide,inject -->


<template>
    <div>
        <h2>counter:{{counter}}</h2>
        <button @click="changeCounter">改变counter</button>
        <h2>user.name:{{user.name}}</h2>
        <button @click="changeUserName">改变User.name</button>

        <h2>{{message}}</h2>
        <button @click="message='nihao'">改变message</button>

        <button @click="sendParent">context.emit</button>

        <h2>provide,inject,跨级通信name:{{name}}</h2>
        <button @click="changeName">改变name</button>

    </div>
</template>

<script>
    import {ref,reactive,toRefs,watch,watchEffect,computed,onUpdated,inject} from 'vue';
    export default{
        props:{
            //这个需要写,通过选项接收后才能在setup里面使用
            message:{
                type:String,
                default:"message",
            }
        },
        
        setup(props,context) {
            //inject-------------------
            const name=inject('name');
            function changeName(){
                name.value='跨级通信name被改变';
            };

            //inject-------------------

            //props---------------------------
            console.log('props:-------',props.message);
            onUpdated(()=>{
                console.log(props.message);
            });
            //props---------------------------

            //context---------------------------------------
            console.log('context-------------',context);
            console.log('context attr-------------',context.attrs);

            const counter2=ref(20);
            
            function sendParent(){
                context.emit('injectCounter2',counter2);
            };
            //context---------------------------------------
            

            const counter=ref(0);
            function changeCounter(){
                counter.value++;
            };
            //选项式API中使用watch
            //需要引入
            // watch(需要侦听的响应式引用,回调函数)
            watch(counter,(newVal,oldVal)=>{
                console.log('newVal-------',newVal);
                console.log('oldVal-------',oldVal);
            });

            const user=reactive({
                name:'zhangsan1',
                age:18,
            });
            function changeUserName(){
                user.name='lisi';
            };

            const msg=ref('message');
            const reverseMsg=computed(()=>{//返回带有value属性的对象
                return msg.value.split('').reverse().join('');
            });
            console.log('reverseMsg--------',reverseMsg.value);

            
            //和选项式一样,侦听对象不能直接侦听属性的变化
            watch(user,(newVal,oldVal)=>{
                console.log('newVal-------',newVal);
                console.log('oldVal-------',oldVal);
            });

            // watchEffect(回调函数)
            // 不需要指定监听的属性,组件初始化时自动执行一次回调函数自动收集依赖,只要在回调中引用到了响应式的属性,只要属性发生改变回调就会执行
            watchEffect(()=>{
                console.log(user.name);
            });
            



            return{counter,user,changeCounter,changeUserName,msg,sendParent,name,changeName};
        },
        
    }

</script>