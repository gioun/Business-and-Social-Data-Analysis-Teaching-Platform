
<!-- 父组件直接访问子组件 $refs vue2有$children,在v3已经废弃 -->
<!-- 子组件访问父组件: $parent $root(访问根组件) 实际开发由于组件复用,不推荐直接使用$parent,更推荐props传值 -->

<script>
import Component_2 from './Component2.vue'  //引入 Component_2

export default{
    emits:['injectMsg'],//声明下自定义事件名称,避免爆黄

    data(){
        //必须是一个函数,组件对象里面已经有了一个data属性
        //这个函数必须要有一个返回的值
        //假设在App.vue中使用了三次本组件,再某一个组件里面的msg改变了以后,其它组件里面的不会改变,
        //如果是一个对象,则会产生数据污染,使得上述情况全部msg改变
        //让每一个组件都返回一个新的对象,不会造成数据污染
        return{
            //msg:"helloworld",
            msg:"helloworld",
            information_from_back:"111111",
            list:[1,2,3,4],
            number:100
        }
        
    },

    components:{
        Component_2                         //注册 Component_2
    },
    methods:{
        //作为子组件向父组件传递数据,通过$emit来触发事件,$emit(自定义事件的名称,发送的事件参数)属于实例的方法
        sendToParent:function(){
            console.log("子组件向父组件发送信息:"+this.msg);
            this.$emit('injectMsg',this.msg);
        }
    },
    mounted(){
        // 使用$refs访问子组件
        console.log("-----------------")
        console.log("refs展示");
        console.log(this.$refs);
        console.log(this.$refs.component2.static);
        console.log(this.$refs.p_label);
        console.log("-----------------")
    }
}

</script>

<template>
    <div>
        
        <h2>component1组件</h2>
        <!-- <Component_2></Component_2>         使用 Component_2 -->
        <h2>{{msg}}</h2>
        <button  @click="msg='change'">改变msg</button>
    </div>
    <p>---------------------------------------------</p>
    <div>
        <!-- 父组件向子组件传递值 -->
        <Component_2 :message="msg" static="static_information"  :number="number"  :list="list"></Component_2>  
    </div>
    <div>
        <!-- 作为子组件向父组件app传递数据 -->
        <button @click="sendToParent">提交数据到父组件</button>
    </div>
    <p>---------------------------------------------</p>

    
    <div>
        <!-- 父组件直接访问子组件 $refs，搭配ref属性使用  vue2有$children,在v3已经废弃 -->
        <!-- ref:给子组件或元素注册一个引用信息,不仅仅在组件上引用 -->
        <p>---------------------------------------------</p>
        <Component_2 :message="msg" static="static_information"  :number="number"  :list="list" ref="component2"></Component_2><!--添加ref,注册引用信息-->
        <p ref="p_label">ref为p_label的段落</p>  
        <p>---------------------------------------------</p>
    </div>
</template>