import {createRouter,createWebHashHistory} from 'vue-router';
// 1. 定义路由组件.
// 也可以从其他文件导入
import Home from '../views/Home.vue';
import About from '../views/About.vue';//注意是前面是两个点,指向当前文件所在地址的上一级地址
import User from '../views/User.vue';
import NotFound from '../views/NotFound.vue';
import News from '../views/News.vue';
import SubParent from '../views/QianTaoLuYou_Parent.vue';
import StyleOne from '../views/StyleOne.vue';
import StyleTwo from '../views/StyleTwo.vue';
import Page from '../views/Page.vue';
import ShopTop from '../views/ShopTop.vue';
import ShopMain from '../views/ShopMain.vue';
import ShopFooter from '../views/ShopFooter.vue';




// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path:'/',
    //重定向,前提是下面已经写有的
    // redirect:'/home',
    //通过方法动态重定向
    redirect:(to)=>{
      console.log(to);//可以根据to参数决定跳转至哪个页面
      return {path:'/home'};
    }
  },
  { 
    path: '/home', 
    alias:['/father','/dad'],//别名
    component: Home, 
  },//Home解析为一个组件
  { path: '/about', component: About },

  // 带参数的动态路由
  {
    path:'/user/:id',
    component: User,
    props:true,//设置为true时$route.params会被设置为User.vue的props

  },

  { //动态路由参数限制,使用正则
    name:'news',
    path:'/news/:id(\\d+)',component:News
    // path:'/news/:id+' 可有多个参数
    // path:'/news/:id*' 参数可有可无,可以有多个参数
    // path:'/news/:id?' 参数可有可无,最多一个参数
  },
  {
    path:'/subparent',component:SubParent,
    children:[
      // 下面的子路由路径不需要加斜杠
      {path:'styleone',component:StyleOne},
      {path:'styletwo',component:StyleTwo},
    ],
  },
  {
    path:'/page',component:Page,
    
  },

  {
    path:'/shop/:id?',
    components:{//注意是components,有s
      //前面会与router-link上的name进行匹配
      default:ShopMain,//shop访问默认的组件,默认显示shopmain
      ShopTop:ShopTop,
      ShopFooter:ShopFooter,
      props:{default:true,ShopTop:false,ShopFooter:false},
    }
  },

  // 使用正则方式表示找不到的匹配,会在上面的顺序一个一个匹配,匹配不到对应的就会匹配任意的路径
  {path:'/:path(.*)',component:NotFound},
 
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单







const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})




export default router;
