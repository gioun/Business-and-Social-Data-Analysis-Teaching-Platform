<!-- 根组件 -->
<!-- 组件是带有名称的可复用的实例,是单独模块的封装 -->

<script>

    import {ref,reactive,toRefs} from 'vue';
    
    
    export default{
      data(){
        return{
          message:"展示msg",
          isShow:true
        };  
      },
      setup() {
        // 组合式api演示
        //在组件创建(create)之前执行,在生命周期钩子中已经替代了beforeCreate和created
        // 不使用this,this不会指向实例
        console.log('setup');
    

        //msg的逻辑代码---------------------
        let msg='hello';//没有响应式
        console.log(msg);
        function changeMsg(){
          msg='nihao'; 
          console.log(msg);//数据不是响应式的
        };
        //msg的逻辑代码---------------------
    


        //通过ref定义响应式变量---------------------
        const msg1=ref('hello');//是一个函数,返回带有value属性的对象
        function changeMsg1(){
          msg1.value='nihao';
          console.log(msg1);
        };
        //通过ref定义响应式变量---------------------


        //obj---------------------
        // 通过reactive定义引用类型的数据
        //响应式的
        const obj=reactive({
          name:'zhangsan',
          age:18,
          children:{
            son:'xiaozhang'
          }
        });
        function changeObjName(){
          obj.name='lisi'
        };
        //obj---------------------

        //toRefs(函数,需要传入对象)使得解构后的数据重新获得响应式
        //在return里面写解构不利于维护
        const obj2=reactive({
          name:'lisi',
          age:19,
          children:{
            son:'xiaoli',
          }
        });

        function changeObj2SonName(){
          obj2.children.son='lisi'
        };
    
        return{
          msg,
          msg1,
          changeMsg,
          changeMsg1,
          obj,
          changeObjName,
          // 通过ES6扩展运算符进行结构使得对象中的属性失去响应式👇扩展运算符进行解构
          // 实际上相当于是让name:obj.name,children:obj.children,但是这样使得obj的方法失去响应式
          ...obj,
          // toRefs使得解构后的数据重新获得响应式
          // 在return里面写解构不利于维护
          changeObj2SonName,
          ...toRefs(obj2),
        };//将数据暴露给实例
    
      },
      components:{   
      },
      computed:{
        
      },
      methods:{
        
      }
      
    
    };
    
    </script>
    
    <template>
      
      <h2>{{msg}}</h2>
    
      <!-- 模板会自动解析value值,不需要指定.value -->
      <h2>{{msg1}}</h2>
      <button @click="changeMsg">改变msg</button>
      <button @click="changeMsg1">改变msg1</button>

      <h2>obj.name:{{obj.name}}</h2>
      <h2>name:{{name}},失去响应式</h2>
      <button @click="changeObjName">改变名字</button>

      <h2>obj.children.son:{{obj.children.son}}</h2>

      <h2>children.son:{{children.son}}</h2>
      <button @click="changeObj2SonName">改变儿子</button>

    
    
      
    
      
    </template>
    
    
    
    <style>
    
    </style>
    