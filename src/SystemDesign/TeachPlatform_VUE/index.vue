<template>

            
    <a-layout-content>
        
        <a-card
        :headStyle="CardHeadStyle"
        :bodyStyle="BodyStyle"
        :bordered="false"
        >
            <template #title>
                <div style="text-align: center;">
                    <h2>商业与社会数据分析教学平台</h2>
                    <p>Business And Social Data Analysis Teaching Platform</p>
                </div>
                
            </template>

            
            

            <template #cover>
                <br>

                <div>
                    <a-row>
                        <a-col :span="8">
                        </a-col>
                        <a-col :span="8">
                        </a-col>
                        
                        <a-col :span="8">
                            <a-tag color="#AE0B2A">中国人民大学</a-tag>
                            <a-tag color="#144FA3">信息学院</a-tag>
                            <a-tag color="#87d068">信息管理与信息系统</a-tag>
                            <a-tag color="#108ee9">系统分析与设计</a-tag>
                            <a-tag color="#f50">大三</a-tag>
                            <a-tag color="#2db7f5">期末作业</a-tag>
                        </a-col>
                    </a-row>
                </div>
            </template>



            
            <a-skeleton active />
            

            <div>
                <a-row>
                    <a-col :span="6">
                    </a-col> 
                    <a-col :span="6">
                        <a-popover title="独特功能">
                            <template #content>
                                <p>该系统实现了以下新功能：</p>
                                <p> 1. 使用微人大选课名单导入学生，自动注册学生用户</p> 
                                <p> 2. 设计小组作业打分功能，一键为学生赋分</p>
                                <p> 3. 设计课程成绩导出功能，教师可导出excel文件查看课程内所有学生打分情况；学生可导出本课程个人的打分情况</p> 
                                <p> 4. 每天8点自动检索至第二天8点未完成的作业，并向学生发送邮件提醒</p>
                                <p> 5. 教师端可一键下载全部学生作业</p>
                                <p> 6. 通过部署到个人服务器的方式搭建流程图绘制界面；通过外链，充分利用Lightly平台的协作优势实现在线代码编译功能</p>
                            </template>
                            <a-button size="large">独特功能</a-button>
                        </a-popover>
                    </a-col> 
                    <a-col :span="6">
                        <a-popover title="系统介绍">
                            <template #content>
                            <p>BSDA是一款由中国人民大学经济信息管理系教研组提出，由系统分析与设计各组实践设计得到的系统。</p>
                            <p>该系统在中国人民大学OBE的基础上进行了用户的痛点调研，扩展了更多适用于教师与学生用户的功能。目前该系统部署在阿里云与华为云服务器上，受到服务器规格的限制，性能方面并未得到良好保障，</p>
                            <p>欢迎各位使用并提出修改意见。</p>
                            </template>
                            <a-button size="large">系统介绍</a-button>
                        </a-popover>
                    </a-col> 
                    <a-col :span="6">
                        <a-popover title="联系方式">
                            <template #content>
                                <p>张佳钇—— 2020201387@ruc.edu.cn</p>
                                <p>欧洋帆—— 2020201628@ruc.edu.cn</p>
                                <p>陈昭润——2020201410@ruc.edu.cn</p>
                                <p>徐雨灵——2020201643@ruc.edu.cn</p>
                                <p>杨乙丁——2020201644@ruc.edu.cn</p>
                            </template>
                            <a-button size="large">联系方式</a-button>
                        </a-popover>
                    </a-col> 

                </a-row>  

                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                
                

                <a-row>   
                    <a-col :span="4"></a-col>
                    <a-col :span="4"></a-col>
                    <a-col :span="4"><a-button @click="LoginVisible=true" size="large" type="primary" >教师登录</a-button></a-col>
                    <a-col :span="4"></a-col>
                    <a-col :span="4"><a-button @click="LoginVisible=true" size="large"  type="primary">学生登录</a-button></a-col>

                    
                </a-row>
            </div>


            <!-- 登录 -->
            <a-modal
            v-model:visible="LoginVisible"
            title="请登录"
            width="1000px"          
            >
                <a-form v-bind="layout">
                    <a-form-item label="账号">
                        <a-input v-model:value="LoginData.data.Account" placeholder="请输入账号" />
                    </a-form-item>
                        
                    <br>

                    <a-form-item  label="密码">
                        <a-input-password  v-model:value="LoginData.data.Password" placeholder="请输入密码" />
                    </a-form-item>
                </a-form>


                <template #footer>
                    <a-button key="back" @click="LoginVisible=false" >取消</a-button>
                    <a-button key="submit" type="primary" @click="Login">登录</a-button>
                </template>
            </a-modal>


            
        </a-card>
            
    </a-layout-content>
            
            
</template>


<script setup>

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import {ref,reactive} from 'vue';
import { message } from 'ant-design-vue'; // 显示提示信息
import { useRouter, useRoute } from 'vue-router';
const router=useRouter();
const route=useRoute();
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();

import axios from 'axios';

const LoginData=reactive({
    data:{
        Account:null,
        Password:null,
    }
})





// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};

const BodyStyle={minHeight: '400px'};

const LoginVisible=ref(false);


const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 12,
},
};


// const LoginAPI='http://123.56.21.208:8002/api/Users/login';
const LoginAPI='http://123.56.21.208:8002/api/Users/login';

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
function Login(){

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
/* #building{
background:url("./img/background3.svg");
width:100%;			

height:100%;
min-height: 960px;			


background-size:100% auto;} */


/* *{
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

.que{
    margin-top: 200px;
    width: 100%;
    height: 50px;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 25px;
    font-weight: 200;
}

button{
    margin-right: 100px;
    width:100px;
    height:35px;
    background-color: rgb(3, 128, 195);
    color: aliceblue;
    font-size: 18px;
    font-weight: 100;
    font-family: "黑体";
}

.id{
    width: 1200px;
    margin: 0 auto;
}

ul{
    padding-left: 350px;
}

ul>li{
    list-style: none;
    float: left;
} */

</style>