<template>
    <a-layout>

      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo"></div>


        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>


      <!--内容部分  -->
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <h2>----------div开始----------</h2>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '780px' }">

          <div >
          <searchbox @sendJsonString="getChildString" :Api="Api"></searchbox>
          </div>
          <div>
            <a-switch v-model:checked="IfSwitch" />
            <span>当前API是:{{Api}}</span>
            <input type="text" v-show="IfSwitch" v-model="Api">
          </div>
        
          <div>
            <autotable :JsonString="JsonString"></autotable>
          </div>
          <!-- 如何在此处插入显示的页面 -->

          <div>
            <examplecontent></examplecontent>
          </div>

        </div>
        <h2>----------div结束----------</h2>
      </a-layout-content>



      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </template>



<script>
  import searchbox from './SearchBox.vue';
  import autotable from './自动布局式表格.vue';
  import examplecontent from './ExampleContent_DI.vue'
  import { defineComponent, ref } from 'vue';
  export default defineComponent(
  {
    setup() {
      return {
        selectedKeys: ref(['2']),
      };
    },
    components:
    {
      searchbox,
      autotable,
      examplecontent,
    },
    data() {
      return {
        JsonString:JSON.stringify({'Name':'默认Json数据','Num':0,'Meaning':'该数据显示说明没有传递数据成功'}),
        IfSwitch:false,
        Api:"https://tenapi.cn/bilibili/?uid=",
      }
    },
    methods: {
      getChildString:function(value){
        console.log("来自子组件的值如下👇");
        console.log(value);
        this.JsonString=value;
      }
    },
    watch:{
      JsonString:function(){
        console.log("父组件App的JsonString被更改");
      }
    },

  
  }
);
</script>
<style>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
</style>