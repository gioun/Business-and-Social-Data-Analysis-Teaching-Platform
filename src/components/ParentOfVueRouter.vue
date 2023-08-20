<!-- 路由:便于构建单页应用 -->
<!-- 单页应用:点击不同按钮,路径发生改变,显示不同内容,但是没有整体页面的刷新和跳转其它页面 -->
<!-- 路由核心:改变URL,但是页面不进行整体刷新 -->
<!-- 路由可以理解为指向 -->
<!-- 路由表:本质是映射表,一个路由就是一组映射关系.key:value,key路径,value:可以是function或component组件 -->

<!-- vue router -->
<!-- vue-router基于路由和组件,路由用于设定访问路径,将路径和组件映射起来 -->
<script setup>
import {ref} from 'vue';
const ifShow=true;

</script>

<template>
    <div>
        <h1>Hello App!</h1>
        
        <p>
          <!--使用 router-link 组件进行导航 -->
          <!--通过传递 `to` 来指定链接 -->
          <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
          <router-link to="/home" >Go to Home</router-link>
          <router-link to="/about">Go to About</router-link>
          <router-link to="/user/123">Go to User</router-link>
          <router-link to="/subparent">Go to SubParent</router-link>
          <router-link :to="{name:'news',params:{id:123}}">Go to News</router-link>
          <router-link to="/page">Go to Page</router-link>
          <router-link to="/shop">Go to Shop</router-link>
        </p>
        <!-- 路由出口 占位符 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <!-- 可以卸载下面或上面 -->

      </div>
      <div>
        <router-view name="ShopTop"></router-view>
        <router-view name="default"></router-view>
        <router-view name="ShopFooter"></router-view>
      </div>
</template>