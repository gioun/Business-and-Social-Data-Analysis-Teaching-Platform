<template>
    
    <a-layout-content >
            
        <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">

            <div>
                <a-card 
                title="个人信息" 
                :bordered="true" 
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >
                    <a-descriptions 
                    title=""
                    bordered
                    >
                        <a-descriptions-item label="姓名" :span="4">{{StudentInfo.data.name}}</a-descriptions-item>
                        <a-descriptions-item label="学院" :span="4">{{StudentInfo.data.college}}</a-descriptions-item>
                        <a-descriptions-item label="年级" :span="4">{{StudentInfo.data.grade}}</a-descriptions-item>
                        <a-descriptions-item label="班级" :span="4">{{StudentInfo.data.c_class}}</a-descriptions-item>
                        <a-descriptions-item label="电话" :span="4">{{StudentInfo.data.phone}}</a-descriptions-item>
                        <a-descriptions-item label="邮箱" :span="4">{{StudentInfo.data.email}}</a-descriptions-item>
                    </a-descriptions> 

                    
                    <template #actions>
                        <a-space size="large">

                            <a-button @click="ChangeStudentInfoVisible=true">修改信息</a-button>
                            <a-button @click="ChangeStudentPasswordVisible=true">修改密码</a-button>
                        </a-space>                            
                    </template>

                    
                </a-card>
            </div>


        </div>

        <!-- 这个地方就是修改信息的地方，到时候单独弹出来一个框修改还是直接在上面的li中修改再研究 -->
        <div>

            <!-- 点击上面修改信息按钮后弹出的显示修改个人信息的界面 -->
            <a-modal
            v-model:visible="ChangeStudentInfoVisible"
            title="修改个人信息"
            width="1000px"
            @ok="ChangeStudentInfoVisible=false"
            >
            
                <a-form v-bind="layout">

                    

                    <a-form-item :name="['StudentInfo', 'Name']" label="姓名">
                        <a-input  placeholder="请输入姓名" v-model:value="NewStudentInfo.data.name"></a-input>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentInfo', 'College']" label="学院">
                        <a-input  placeholder="请输入学院" v-model:value="NewStudentInfo.data.college"></a-input>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentInfo', 'Grade']" label="年级">
                        <Selector :Options="GradeOption"  @selected_value="GradeSelected"></Selector>    
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentInfo', 'Class']" label="班级">
                        <a-input  placeholder="请输入班级" v-model:value="NewStudentInfo.data.c_class"></a-input>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentInfo', 'Phone']" label="电话">
                        <a-input  placeholder="请输入电话" v-model:value="NewStudentInfo.data.phone"></a-input>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentInfo', 'Email']" label="邮箱">
                        <a-input  placeholder="请输入邮箱" v-model:value="NewStudentInfo.data.email"></a-input>
                    </a-form-item>
                    <br>


                    
                </a-form>

                <template #footer>
                    <!-- 修改信息确认与取消 -->
                    <a-button key="back" @click="CancelChangeStudentInfo">取消修改</a-button>
                    <a-popconfirm
                        title="确定修改上述信息?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="SubmitChangeStudentInfo"
                    >
                        <a-button key="submit" type="primary" :loading="Loading">提交修改</a-button>
                    </a-popconfirm>
                </template>

            </a-modal>

            <!-- 点击上面修改密码按钮后弹出修改密码界面 -->
            <a-modal
            v-model:visible="ChangeStudentPasswordVisible"
            title="修改个人密码"
            width="1000px"
            @ok="ChangeStudentPasswordVisible=false"
            >
            
                <a-form v-bind="layout">
                    
                    <a-form-item :name="['StudentPass', 'Old']" label="请输入旧密码">
                        <a-input-password  placeholder="请输入旧密码" v-model:value="PasswordInfo.data.Past_password"/>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentPass', 'New1']" label="请输入新密码">
                        <a-input-password  placeholder="请输入新密码" v-model:value="PasswordInfo.data.password1"/>
                    </a-form-item>
                    <br>

                    <a-form-item :name="['StudentPass', 'New2']" label="请再次输入新密码">
                        <a-input-password  placeholder="请再次输入新密码" v-model:value="PasswordInfo.data.password2"/>
                    </a-form-item>
                    <br>

                </a-form>

                
                <template #footer>
                    <!-- 确认与取消界面 -->
                    <a-button key="back" @click="ChangeStudentPasswordVisible=false">取消修改</a-button>

                    <a-popconfirm
                        title="确定修改上述信息?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="SubmitChangePasswordInfo"

                    >
                        <a-button key="submit" type="primary" :loading="Loading">提交修改</a-button>
                    </a-popconfirm>
                    
                </template>

            </a-modal>
        </div>

    </a-layout-content>


    
    
</template>


<script setup>
import {ref,reactive} from 'vue';
import axios from 'axios';
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;
// 显示信息
import { message } from 'ant-design-vue';

import Selector from '../GeneralComponents/Selector.vue';


// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '400px'};

//---------------------------------------------------------------------个人信息
//  获取个人信息
// 从后台获取的当前学生的个人信息
const StudentInfo=reactive({
    data:{
        name:'',
        gender:'',
        college:'',
        grade:'',
        c_class:'',
        phone:'',
        email:'',

    }
});

// 新的将要提交的信息,新的数据,避免直接修改但没有提交导致本地页面数据直接变更
const NewStudentInfo=reactive({
    data:StudentInfo.data,
})

function GetStudentInformation()
{
    // UserID="20202028"应该是需要修改的,对应的是LoginStore.status.data.ID
    const UserID=LoginStore.status.data.ID;
    const GetInfoApi='http://123.56.21.208:8002/api/Users/StudentInfo/'+UserID+'/';
    // console.log('API:',GetInfoApi);
    axios.get(GetInfoApi)
            .then(function (response) {
                // console.log(response);
                console.log(response.data);
                StudentInfo.data=response.data;
                NewStudentInfo.data=StudentInfo.data;
                

                //LoginStore.status.data.ID
                //LoginStore.status.data.UserName
            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    alert("Error,联系管理员解决问题");
            });
}
GetStudentInformation();


//---------------------------------------------------------------------修改个人信息

// 弹出界面初始状态不弹出
const ChangeStudentInfoVisible=ref(false);

const Loading=ref(false);

// 弹出修改个人信息界面的函数
function ChangeStudentInfo(){
    ChangeStudentInfoVisible.value=true;
}

// 关闭修改个人信息界面的函数
function CancelChangeStudentInfo()
{
    ChangeStudentInfoVisible.value=false;
}

// 表单的布局
const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 8,
},
};

const GradeOption=[
    {value:1,label:"大一"},
    {value:2,label:"大二"},
    {value:3,label:"大三"},
    {value:4,label:"大四"},
];

function GradeSelected(GradeFromChildSelector){
    // console.log("from child:",GradeFromChildSelector);
    NewStudentInfo.data.grade=GradeFromChildSelector;
    // console.log('NewCourse.data.course_Grade:',NewCourse.data.course_Grade);
}


// 提交修改信息
function SubmitChangeStudentInfo()
{
    console.log('修改信息');
    Loading.value=true;

    // 当axios成功创建后才关闭
    // ChangeStudentInfoVisible.value=false;
    
    // UserID="20202028"应该是需要修改的,对应的是LoginStore.status.data.ID
    const UserID=LoginStore.status.data.ID;
    const PutInfoApi='http://123.56.21.208:8002/api/Users/StudentInfo/'+UserID+'/';
    //  headers: { 'token':localStorage.getItem ("token") } 

    // console.log('LoginStore.status.data.Token:',LoginStore.status.data.Token);

    

    // const config={headers: {Authorization: `Bearer ${LoginStore.status.data.Token}`}};

    // console.log('配置请求');
    // console.log('NewStudentInfo.data',NewStudentInfo.data);
    // console.log('API:',PutInfoApi);
   
    // console.log('config headers:',{headers: {Authorization: `Bearer ${token}`}});

    axios.put(PutInfoApi,NewStudentInfo.data,{headers: {Authorization: `Bearer ${token}`}})
            .then(function (response) {
                // console.log(response);
                console.log(response.data);
                // console.log('修改成功');

                StudentInfo.data=NewStudentInfo.data;
                message.success('修改成功');
                ChangeStudentInfoVisible.value=false;

            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    console.log(NewStudentInfo.data);
                    console.log(StudentInfo.data);
                    alert("Error,联系管理员解决问题");
            });



    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);
    

}

//---------------------------------------------------------------------修改密码
const ChangeStudentPasswordVisible=ref(false);

// 准备提交密码的内容
const PasswordInfo=reactive({
    data:{
        
        password1:"",
        password2:"",
        Past_password: ""

    }
})

function SubmitChangePasswordInfo()
{
    console.log('修改密码');
    Loading.value=true;


    // 当axios成功创建后才关闭
    // ChangeTeacherInfoVisible.value=false;
    

    const PutPasswordInfoApi='http://123.56.21.208:8002/api/Users/UpdatePassword/';
    //  headers: { 'token':localStorage.getItem ("token") } 

    // console.log('LoginStore.status.data.Token:',LoginStore.status.data.Token);

 


    // console.log('配置请求');
    // console.log('PasswordInfo.data',PasswordInfo.data);
    // console.log('API:',PutPasswordInfoApi);
    // console.log('config headers:',{headers: {Authorization: `Bearer ${token}`}});

    axios.put(PutPasswordInfoApi,PasswordInfo.data,{headers: {Authorization: `Bearer ${token}`}})
            .then(function (response) {
                // console.log(response);
                console.log(response.data);
                // console.log('修改成功');
                message.success('修改成功');
                ChangeTeacherPasswordVisible.value=false;


            })
            .catch(function (error) {
                    console.log('error--------------');
                    const reason=error.response.data.message;
                    const message1='出现错误:'+reason
                    message.error(message1);

                    
            });



    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
        
      }, 1000);
}





</script>


<style scoped>
*{
    margin: 0;
    padding: 0;
}

.header{
    line-height: 15px;
}

.inst{
    width: 100%;
    height: 50px;
    background-color: rgba(0, 47, 88, 0.821)
}

.img{
    display: inline-block;
    padding-left: 25px;
    padding-top: 4px;
    position: relative;
}

.ulone{
    display: inline-block;
    margin-left: 50px;
}

.lione{
    list-style: none;
    float: left;
    padding-right: 50px;
    line-height: 40px;
    text-align: center;
    font-size: 19px;
    color: aliceblue;
}

.account{
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

.classlist{
    margin: 20px auto;
    width: 70%;
    height: 500px;
    border: 5px solid rgb(255, 82, 82);
    display: inline-block;
}

.content{
    display: flex;
}

.info{
    margin: 80px auto;
    width: 70%;
    height: 200px;
    border: 2px solid rgba(0, 47, 88, 0.821);
}

.litwo{
    margin: 20px;
    list-style: none;
    line-height: 40px;
    text-align: center;
    font-size: 19px;
    color: rgb(0, 0, 0);
}

.modify{
    margin: 0 auto;
    text-align: center;
}

button{
    width: 100px;
    height: 30px;
    font-size: 18px;
}

</style>