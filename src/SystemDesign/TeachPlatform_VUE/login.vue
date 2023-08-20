
<template>
    
    

    <!-- 大标题 -->
    <div class="title">
        <h1>商业与社会数据分析教学平台</h1>    
        <p>Business And Social Data Analysis Teaching Platform</p>
    </div>
    <br>

    <!-- 登录输入框 -->
    <div class="log">
        <div class="input">
            <form>
            <!-- 账号最长为十位 -->
                账号：<input type="text" name="Account" class="inp" maxlength="10" v-model="LoginData.data.Account">
                密码：<input type="password" name="Password" class="inp" v-model="LoginData.data.Password">
            </form> 
            <div class="sub">
                    <input type="submit" class="submit" value="登录" @click="NormalLogin">
            </div>
        </div>
    </div>
</template>


<script setup>
import {ref,reactive} from "vue";
import { useRouter, useRoute } from 'vue-router';

import { message } from 'ant-design-vue'; // 显示提示信息


const router=useRouter();
const route=useRoute();
function goIndex(){
    console.log('goIndex');
    router.push('/index');
}



import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();

const LoginAPI='http://123.56.21.208:8002/api/Users/login';

import axios from 'axios';
const LoginData=reactive({
    data:{
        Account:null,
        Password:null,
    }
})


// 处理成功登录后进入的不同页面
function SucceedLogin()
{
    if(LoginStore.status.data.IsStudent)
    {
        message.success("欢迎进入,"+LoginStore.status.data.Name+'同学');
        // alert("欢迎进入,"+LoginStore.status.data.Name+'同学');
        router.push('/CourseManagement_St');
    }
    else if(LoginStore.status.data.IsTeacher)
    {
        message.success("欢迎进入,"+LoginStore.status.data.Name+'老师');
        // alert("欢迎进入,"+LoginStore.status.data.Name+'老师');
        router.push('/CourseManagement_T');
    }
    else if(LoginStore.status.data.IsAdmin)
    {
        message.success("欢迎进入,"+LoginStore.status.data.Name+'爹');
        // alert("欢迎进入,"+LoginStore.status.data.Name+'管理员');
        
    }
}

// 登录
function NormalLogin(){

// console.log(LoginData.data);

var data = new FormData();
data.append('username', LoginData.data.Account);
data.append('password', LoginData.data.Password);

axios.post('http://123.56.21.208:8002/api/Users/login',data,{
                'Content-type' : 'multipart/form-data'
                })
            .then(function (response) {
                console.log(response);
                console.log(response.data);


                // 👇登录处理
                LoginStore.status.data.IfLogin=true;
                LoginStore.status.data.Token=response.data.access;
                LoginStore.status.data.ID=response.data.ID;
                LoginStore.status.data.UserName=response.data.username;
                LoginStore.status.data.Name=response.data.name;
                LoginStore.status.data.IsAdmin=response.data.is_manager;
                LoginStore.status.data.IsStudent=response.data.is_student;
                LoginStore.status.data.IsTeacher=response.data.is_teacher;


                // alert("欢迎进入,"+LoginStore.status.data.Name+'老师');
                // console.log('LoginStore:',LoginStore.status.data);
                SucceedLogin();
                localStorage.setItem("PiniaStore", JSON.stringify(LoginStore.status.data));
                
                // router.push('/CourseManagement_T');  



            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    alert("Error,联系管理员解决问题");
            });

}

 
        
</script>


<style scoped>
    *{
    margin: 0;
    padding: 0;
}

body{
    background: url(./img/bg.png) no-repeat;
    background-size: 1600px 900px;
}

.header{
    line-height: 15px;
}

.inst{
    width: 100%;
    height: 50px;
    background-color: rgba(0, 47, 88, 0.821)
}

.img0{
    display: inline-block;
    padding-left: 25px;
    padding-top: 4px;
}

.langauge{
    float: right;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
    font-weight: 100;
    font-family:"Century Gothic";
    padding-right: 50px;
}

a{
    text-decoration: none;
    color: aliceblue;
}

.title{
    margin-top: 180px;
    width: 100%;
    height: 50px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    font-size: 35px;
    font-weight: 100;
}

.log{
    margin-top: 200px;
    width: 100%;
    height: 60px;
}

.input{
    text-align: center;
    font-size: 20px;
    padding: 5px;
    color: rgb(188, 195, 200);
}

.inp{
    width: 210px;
    height: 22px;
}

.sub{
    width: 100%;
    height: 50px;
    margin: auto;
    text-align: center;
}

.submit{
    width: 150px;
    height: 32px;
    text-align: center;
    font-size: 20px;
}

.vruc{
    width: 100%;
    height: 50px;
    text-align: center;
}

</style>