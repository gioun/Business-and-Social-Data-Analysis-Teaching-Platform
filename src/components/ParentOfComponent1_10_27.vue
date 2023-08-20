
<!-- 组件是带有名称的可复用的实例,是单独模块的封装 -->
<script>
    import Content1 from './Component1.vue'; //引入
    
    export default{
      data(){
        
        return{
          message:""
        };
        
        
      },
      components:{
          Content1  //注册
        },
      computed:{
        
      },
    
      watch:{
        message:function(){
          console.log("父组件App的message被更改");
        }
      },
      methods:{
        getChildMsg:function(value){
          
          console.log("来自子组件的值如下👇");
          console.log(value);
          this.message=value;
        }
      }
      
    
    };
    
    </script>
    
    <template>
      <div>
        <h1>ParentOfComponent1组件:{{message}}</h1>
        
        <!-- 通过自定义事件从子组件拿到数据 -->
        <!-- 再父组件中通过v-on监听自定义事件 -->
        <Content1 @injectMsg="getChildMsg"></Content1>
    
        
      </div>
    </template>
    
    
    
    <style>
    
    </style>
    