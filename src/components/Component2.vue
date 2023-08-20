<!-- 子组件访问父组件 $parent 子组件访问根组件$root -->
<!-- 开发中不推荐 $parent直接访问 -->

<script>
    export default{
        //props:["message","static"]//使用props属性获取从父组件来的数据//名字和父组件给的属性名相同
        
        props:{
            //希望每个prop都有指定的值的类型,可以以对象的形式列出prop,和上面似乎只能二选一
            //可以设置类型和默认值

            message:{type:String,default:"defaultstring",require:true},
            static:String,
            number:Number,
            list:{
                type:Array,
                default(){//对象或数组类型必须从一个工厂函数返回(虽然直接list:[]实际测试过程中也可以就是了)
                    return []
                }
            }
        },
        mounted(){
            //与父组件访问子组件不同,不需要注册,可以直接$parent访问
        
            console.log("-----------------")
            console.log("展示父组件信息");
            console.log(this.$parent);
            console.log("-----------------");
            //在实际开发由于组件复用,不推荐直接使用,更推荐props传值

            console.log("-----------------")
            console.log("展示根组件信息");
            console.log(this.$root);
            console.log("-----------------");


        }
    }
</script>


<template>
    <div>

        
        <p>------------------------this is from Component2.vue-------------------------------</p><br>
        hello <br>
        <p>===================</p>
        <h2>来自父组件的动态字符串类型数据:{{message}}</h2>
        <h2>来自父组件的静态字符串类型数据:{{static}}</h2>
        <h2>来自父组件的动态数字类型数据:{{number}}</h2>
        <h2>来自父组件的动态数组类型数据:{{list}}</h2>
        <p>===================</p>
        <p>------------------------this is from Component2.vue-------------------------------</p><br>

    </div>
</template>