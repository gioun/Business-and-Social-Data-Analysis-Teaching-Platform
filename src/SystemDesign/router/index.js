// 配置路由
// 理论上也可以直接写进组件里面,而且感觉会更加简单,但是后续肯定会增加组件和目录,所以就这样吧


// 👇需要处理的内容
//  路由守卫,需要处理路由跳转的权限

// main.js里面的配置
// import router from 'index.js';//根据目录修改
// app.use(router);

//存储目录需要修改,现在整理不够好
import {createRouter,createWebHashHistory} from 'vue-router';
import index from '../TeachPlatform_VUE/index.vue';


import nofound from '../TeachPlatform_VUE/NotFound.vue';

import CourseManagement_St from '../Student/CourseManagement_St.vue';
import Homework_St from  '../Student/Homework_St.vue';





import Homework_T from '../Teacher/Homework_T.vue';
import CourseManagement_T from '../Teacher/CourseManagement_T.vue';
import Account_St from '../Student/Account_St.vue';
import Account_T from '../Teacher/Account_T.vue';
import Community_St from '../Student/Community_St.vue';
import Community_T from '../Teacher/Community_T.vue';

import Resource_St from '../Student/Resource_St.vue';
import Resource_T from '../Teacher/Resource_T.vue';

const routes =[

    // {
    //     path:'/',
    //     //重定向,前提是下面已经写有的
    //     // redirect:'/home',
    //     //通过方法动态重定向
    //     redirect:(to)=>{
    //       console.log(to);//可以根据to参数决定跳转至哪个页面
    //       return {path:'/index'};
    //     }
    // },
    
    {
        path:'/index',
        alias:['/home','/'],
        component:index,
    },
    {
        path:'/CourseManagement_St',
        component:CourseManagement_St,
    },

    {
        path:'/Homework_St',
        component:Homework_St,
    },
    {
        path:'/Homework_T',
        component:Homework_T,
    },

    {
        path:'/CourseManagement_T',
        component:CourseManagement_T,
    },
    {
        path:'/Account_St',
        component:Account_St,
    },
    {
        path:'/Account_T',
        component:Account_T,
    },
    {
        path:'/Community_St',
        component:Community_St,
    },
    {
        path:'/Community_T',
        component:Community_T,
    },
    {
        path:'/Resource_St',
        component:Resource_St,
    },
    {
        path:'/Resource_T',
        component:Resource_T,
    },


    {
        path:'/:path(.*)',
        component:nofound,
    },

    
];

const router=createRouter(
    {
        history:createWebHashHistory(),
        routes,
    }
);

import pinia from '../Status/Pinia';
import {useLoginInStore} from '../Status/Store';

// 下面这部分应该是不需要的
// router.beforeEach((to, from, next) => {
//   // 判断用户是否已经登录
//   const LoginStore = useLoginInStore();
//   if (!LoginStore.status.data.IfLogin) {
//     // 如果已经登录，允许用户进入该路由
//     return '/index';
//   } 
// })


// 👇路由守卫,实际编写时需要使用
router.beforeEach((to,from,next) => {
    // ✅ 这样做是可行的，因为路由器在安装完之后就会开始导航。
    // Pinia 也将被安装。
    const LoginStore = useLoginInStore();

    if (LoginStore.status.data.IfLogin) 
    {
        if(LoginStore.status.data.IsTeacher&&to.path.split('_')[1]=='T')
        {
            // console.log('进入教师板块');
            next();
        }
        else if(LoginStore.status.data.IsStudent&&to.path.split('_')[1]=='St')
        {
            // console.log('进入学生板块');
            next();
        }
        else if(to.path == "/index" || to.path == "/login" || to.path=='/')
        {
            // console.log('进入管理员板块');
            next();
        }
        else
        {
            next("/index")
        }
    }
    else if(to.path == "/index" || to.path == "/login" || to.path=='/')
    {
        // console('在3个基础页面刷新,不重定向');
        next();
    }
    else{
        // console.log('触发重定向');
        next("/index")
    }
  })
    

export default router;