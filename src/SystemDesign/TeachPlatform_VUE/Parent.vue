<template>
    <a-layout class="layout">
        <a-layout-header v-if="true" >
        
            <div class="logo" >
                
            </div>
            <!-- 跳转框 -->
            <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '64px', }"
                @select="ToPage"
                
            >
                <a-menu-item key="Index" > <img src="./img/Icon4.png" alt="logo" width="300" height="50"> </a-menu-item>
                <a-menu-item key="Account" title="个人帐户">个人帐户</a-menu-item>
                <a-menu-item key="CourseManagement" title="课程管理">课程管理</a-menu-item>
                <a-menu-item key="Homework" title="作业测试">作业测试</a-menu-item>
                <a-menu-item key="Community" title="匿名社区">匿名社区</a-menu-item>
                <a-menu-item key="Resource" title="资源访问">资源访问</a-menu-item>
                
            </a-menu>
        </a-layout-header>



        <!-- <a-layout>
        
            <a-layout-sider width="200" style="background: #fff" >
                <a-menu
                    v-model:selectedKeys="selectedKeys2"
                    v-model:openKeys="openKeys"
                    mode="inline"
                    :style="{ height: '100%', borderRight: 0 }"
                >
                    <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                        <user-outlined />
                        subnav 1
                        </span>
                    </template>
                    <a-menu-item key="1">option1</a-menu-item>
                    <a-menu-item key="2">option2</a-menu-item>
                    <a-menu-item key="3">option3</a-menu-item>
                    <a-menu-item key="4">option4</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                        <laptop-outlined />
                        subnav 2
                        </span>
                    </template>
                    <a-menu-item key="5">option5</a-menu-item>
                    <a-menu-item key="6">option6</a-menu-item>
                    <a-menu-item key="7">option7</a-menu-item>
                    <a-menu-item key="8">option8</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                    <template #title>
                        <span>
                        <notification-outlined />
                        subnav 3
                        </span>
                    </template>
                    <a-menu-item key="9">option9</a-menu-item>
                    <a-menu-item key="10">option10</a-menu-item>
                    <a-menu-item key="11">option11</a-menu-item>
                    <a-menu-item key="12">option12</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>

            <a-layout>
                <a-layout-content >

                    
                    <div :style="{ background: '#fff', padding: '0px', minHeight: '960px'}">
                        
                        <router-view></router-view>  

                    </div>

                </a-layout-content>
            </a-layout>


        </a-layout> -->


    

        <a-layout-content style="padding:  20px; ">
            
                <div :style="{ background: '#fff',magin:'5px', padding: '5px', minHeight: '800px',}">
                    
                        <router-view></router-view>  

                </div>
            
        </a-layout-content>
    

    
    



        <!-- 底部设置框 -->
        <a-layout-footer style="text-align: center">
            Business And Social Data Analysis Teaching Platform

            <!-- 测试板块 -->
            <!-- <div>
                <h2>临时测试板块</h2>
                
                <p>现在的登录状态:{{LoginStore.status.data.IfLogin}}</p>
                <p>现在的状态{{LoginStore.status.data}}</p>
                <a-button @click="LoginStore.status.data.IfLogin=!LoginStore.status.data.IfLogin">登录</a-button>
                
                <button @click="LoginParse">测试</button>

                <p>token:{{token}}</p>

                <a-radio-group v-model:value="UserType" name="radioGroup" @change="SetUserType">
                    <a-radio value="1">学生</a-radio>
                    <a-radio value="2">教师</a-radio>
                    <a-radio value="3">管理员</a-radio>
                </a-radio-group>
                <a-divider/>

                <h2>API测试板块</h2>
                <a-input v-model:value="TestAPI" placeholder="测试API"></a-input>
                <a-radio-group v-model:value="Method" name="radioGroup" >
                    <a-radio value="get">Get</a-radio>
                    <a-radio value="post">Post</a-radio>
                    <a-radio value="put">Put</a-radio>
                    <a-radio value="delete">Delete</a-radio>
                </a-radio-group>

                <a-input v-model:value="Data" placeholder="传输数据"></a-input>
                <a-radio-group v-model:value="DataType" name="radioGroup" >
                    <a-radio value='true'>处理为Json</a-radio>
                    <a-radio value='false'>处理为字符串</a-radio>
                </a-radio-group>

                <a-radio-group v-model:value="TokenType" name="radioGroup" >
                    <a-radio value='true'>需要token</a-radio>
                    <a-radio value='false'>不需要token</a-radio>
                </a-radio-group>

                <a-button @click="TestAPIFunction">API测试</a-button>


                <a-divider/>
                <a-button @click="AllDownload">批量下载测试</a-button>


                <a-divider/>

                <a-input v-model:value="TestAPI" placeholder="测试API"></a-input>
                <a-input v-model:value="Data" placeholder="传输数据"></a-input>
                <input type="file" id="TempInputFile" name="InputFiles">
                <a-button @click=" SendFiles">发送文件</a-button>

            </div> -->

          </a-layout-footer>

        
    </a-layout>

    
</template>


<!-- <template>


    
    
</template> -->

<script setup>
import {ref,reactive,toRaw} from 'vue';
import index from './index.vue';
import login from './login.vue';
import {useLoginInStore} from '../Status/Store';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';




const selectedKeys=ref(['']);



const selectedKeys2= ref(['1']);
const collapsed= ref(false);
const openKeys=ref(['sub1']);



// 👇测试用

const LoginStore=useLoginInStore();

// 从本地存储获取登录状态
LoginStore.LoginFromLocalStorage();

const UserType=ref('');

function SetUserType()
{
    LoginStore.status.data.IsStudent=(UserType.value=='1');
    LoginStore.status.data.IsTeacher=(UserType.value=='2');
    LoginStore.status.data.IsAdmin=(UserType.value=='3');
}

const token=LoginStore.status.data.Token;

// 👇顶部导航进入不同页面L缺少管理员的部分

const router=useRouter();


const False=false;

function ToPage(){

    


    if(selectedKeys.value[0]==='Index')
    {
        router.push('/index');
        selectedKeys.value=[];
    }
    else if(!LoginStore.status.data.IfLogin)
    {
        return ;
    }
    else
    {
        

        if(LoginStore.status.data.IsStudent)
        {

            router.push('/'+selectedKeys.value[0]+'_St');
            selectedKeys.value=[];
            
        }
        else if(LoginStore.status.data.IsTeacher)
        {

            router.push('/'+selectedKeys.value[0]+'_T');
            selectedKeys.value=[];
            
        }
        else if(LoginStore.status.data.IsAdmin)
        {
            
        }
    }
}

//-----------------------------------控制台
const TestAPI=ref('');
const Method=ref('');
const Data=ref('');

const DataType=ref('');
const TokenType=ref('');



function TestAPIFunction()
{
    console.log(Method.value);
    console.log(TestAPI.value);
    console.log(DataType.value);
    console.log(TokenType.value);
    console.log(DataType.value=='true');
    console.log(TokenType.value=='true');


    // 这个true和false有时候解释成boolean,有时候解释成字符串,就你吗抽象
    const Config={
        method:Method.value,
        url:TestAPI.value,
        data: DataType.value=='true'?JSON.parse(Data.value):Data.value,
        headers: TokenType.value=='true'?{Authorization: `Bearer ${token}`}:{},
    }
    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
        alert('error');
    })
}



// 批量下载
function downloadFile(url){//下载文件方法
	const iframe = document.createElement("iframe");
    iframe.style.display = "none";  // 防止影响页面
    iframe.style.height = 0;  // 防止影响页面
    iframe.src = url; 
    document.body.appendChild(iframe);  // 这一行必须，iframe挂在到dom树上才会发请求
    setTimeout(()=>{
      iframe.remove();
    }, 5 * 60 * 1000);
}

const data=['http://123.56.21.208:8002/api/Lesson/Notice_Download/18','http://123.56.21.208:8002/api/Lesson/Notice_Download/18'];

function AllDownload()
{
    data.forEach(element => {
    downloadFile(element);//循环调用方法
    });
}


function SendFiles()
{
    var File = document.getElementById('TempInputFile').files[0];
    var NewFormData = new FormData();
    console.log(Data);
    console.log(Data.value);
    var JsonFile= JSON.parse(Data.value);

    for(const i in JsonFile)
    {
        NewFormData.append(i,JsonFile[i]);
    }
    NewFormData.append("Files",File);


    axios.post(TestAPI.value,NewFormData,{
        'Content-type' : 'multipart/form-data',
        headers: {Authorization: `Bearer ${token}`},
    }).then(function (response) {
        console.log(response);
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error--------------');
        console.log(error);
        alert("Error,上传失败");

    });
}

</script>



<style scoped>


</style>


