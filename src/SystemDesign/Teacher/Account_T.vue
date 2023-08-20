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
                        <!-- <a-descriptions-item label="工号">{{TeacherInfo.data.TeacherID}}</a-descriptions-item> -->
                        <a-descriptions-item label="ID" :span="4">{{LoginStore.status.data.ID}}</a-descriptions-item>
                        <a-descriptions-item label="姓名" :span="4">{{TeacherInfo.data.name}}</a-descriptions-item>
                        <a-descriptions-item label="性别" :span="4">{{TeacherInfo.data.gender==1? '男':'女'}}</a-descriptions-item>
                        <a-descriptions-item label="职称" :span="4">{{TeacherInfo.data.title}}</a-descriptions-item>
                        <a-descriptions-item label="电话" :span="4">{{TeacherInfo.data.phone}}</a-descriptions-item>
                        <a-descriptions-item label="邮箱" :span="4">{{TeacherInfo.data.email}}</a-descriptions-item>
                        <!-- <a-descriptions-item label="账号">{{TeacherInfo.data.TeacherAccount}}</a-descriptions-item> -->
                    </a-descriptions> 

                    <template #actions>
                        <a-space size="large">
                            <a-button @click="ChangeTeacherInfo">修改信息</a-button>
                            <a-button @click="ChangeTeacherPassword">修改密码</a-button>
                        </a-space>                            
                    </template>
                </a-card>
            </div>
        </div>

        <div>
            <a-modal
            v-model:visible="ChangeTeacherInfoVisible"
            title="修改个人信息"
            width="1000px"          
            >
                <!-- 修改个人信息的表单 -->
                <a-form v-bind="layout">

                    <!-- <h2>应该注意有的数据是不能修改的,后续要对,要处理v-model,需要使用lazy,或者直接不让改,写死</h2> -->


                    <a-form-item :name="['TeacherInfo', 'Name']" label="姓名">
                        <a-input  placeholder="请输入姓名" v-model:value="NewTeacherInfo.data.name"></a-input>
                    </a-form-item>


                    <a-form-item :name="['TeacherInfo', 'Title']" label="职称">
                        <a-input  placeholder="请输入职称" v-model:value="NewTeacherInfo.data.title"></a-input>
                    </a-form-item>

                    <a-form-item :name="['TeacherInfo', 'Phone']" label="电话">
                        <a-input  placeholder="请输入电话" v-model:value="NewTeacherInfo.data.phone"></a-input>
                    </a-form-item>

                    <a-form-item :name="['TeacherInfo', 'Email']" label="邮箱">
                        <a-input  placeholder="请输入邮箱" v-model:value="NewTeacherInfo.data.email"></a-input>
                    </a-form-item>
            
                    
                </a-form>
                <template #footer>
                    <a-button key="back" @click="CancelChangeTeacherInfo">取消修改</a-button>
                    <a-popconfirm
                        title="确定修改上述信息?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="SubmitChangeTeacherInfo"

                    >
                        <a-button key="submit" type="primary" :loading="Loading">提交修改</a-button>
                    </a-popconfirm>
                    
                </template>
            </a-modal>

            <!-- 修改密码页面 -->
            <a-modal
                v-model:visible="ChangeTeacherPasswordVisible"
                title="修改个人密码"
                width="1000px"
                >
                <!-- 修改个人信息的表单 -->
                <a-form v-bind="layout">

                    <a-form-item :name="['TeacherPass', 'Old']" label="请输入旧密码">
                        <a-input-password  placeholder="请输入旧密码" v-model:value="PasswordInfo.data.Past_password"/>
                        
                    </a-form-item>

                    <a-form-item :name="['TeacherPass', 'New1']" label="请输入新密码">
                        <a-input-password  placeholder="请输入新密码" v-model:value="PasswordInfo.data.password1"/>
                    </a-form-item>

                    <a-form-item :name="['TeacherPass', 'New2']" label="请再次输入新密码">
                        <a-input-password  placeholder="请再次输入新密码" v-model:value="PasswordInfo.data.password2"/>
                    </a-form-item>

                    
                </a-form>

                <template #footer>
                    <a-button key="back" @click="CancelChangePasswordInfo">取消修改</a-button>

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
// 显示信息
import { message } from 'ant-design-vue';


// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '400px'};



// 从后台获取的当前教师的个人信息
// API:http://123.56.21.208:8002/api/Users/TeacherInfo/20202028/

// 教师信息,展示,需要从后台获取
const TeacherInfo=reactive({
    data:{
        name:"欧洋帆",
        gender:1,
        email:"20202029@ruc.edu.cn",
        phone:18831933368,
        title:"超级大教授"
    }
})

// 新的将要提交的信息,新的数据,避免直接修改但没有提交导致本地页面数据直接变更
const NewTeacherInfo=reactive({
    data:TeacherInfo.data
})

//---------------------------------------------------------------------个人信息
//  获取个人信息
function GetTeacherInformation()
{
    // UserID="20202028"应该是需要修改的,对应的是LoginStore.status.data.ID
    const UserID=LoginStore.status.data.ID;
    const GetInfoApi='http://123.56.21.208:8002/api/Users/TeacherInfo/'+UserID+'/';
    // console.log('API:',GetInfoApi);
    axios.get(GetInfoApi)
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                TeacherInfo.data=response.data;
                NewTeacherInfo.data=TeacherInfo.data;
                // TeacherInfo.data.gender=response.data.gender;
                // TeacherInfo.data.phone=response.data.phone;
                // TeacherInfo.data.email=response.data.email;
                // TeacherInfo.data.title=response.data.title;

                //LoginStore.status.data.ID
                //LoginStore.status.data.UserName
            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    alert("Error,联系管理员解决问题");
            });
}
GetTeacherInformation();

// 修改个人信息界面弹出界面


// 修改信息弹窗可视化
const ChangeTeacherInfoVisible=ref(false);

const Loading=ref(false);

// 这个只是展示进入修改界面
function ChangeTeacherInfo(){
    ChangeTeacherInfoVisible.value=true;
}
// 取消弹出页面
function CancelChangeTeacherInfo()
{
    ChangeTeacherInfoVisible.value=false;
}
// 表单排版
const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 8,
},
};

// 提交修改
function SubmitChangeTeacherInfo()
{
    console.log('修改信息');
    Loading.value=true;

    // 当axios成功创建后才关闭
    // ChangeTeacherInfoVisible.value=false;
    
    // UserID="20202028"应该是需要修改的,对应的是LoginStore.status.data.ID
    const UserID=LoginStore.status.data.ID;
    const PutInfoApi='http://123.56.21.208:8002/api/Users/TeacherInfo/'+UserID+'/';
    //  headers: { 'token':localStorage.getItem ("token") } 

    // console.log('LoginStore.status.data.Token:',LoginStore.status.data.Token);

    const token=LoginStore.status.data.Token;

    // const config={headers: {Authorization: `Bearer ${LoginStore.status.data.Token}`}};

    // console.log('配置请求');
    // console.log('NewTeacherInfo.data',NewTeacherInfo.data);
    // console.log('API:',PutInfoApi);
   
    // console.log('config headers:',{headers: {Authorization: `Bearer ${token}`}});

    axios.put(PutInfoApi,NewTeacherInfo.data,{headers: {Authorization: `Bearer ${token}`}})
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                // console.log('修改成功');
                
                TeacherInfo.data=NewTeacherInfo.data;
                ChangeTeacherInfoVisible.value=false;

                message.success('修改成功');


            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    alert("Error,联系管理员解决问题");
            });



    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);
    

}

//  不太有意义的HandleOK;
function HandleOk()
{
    console.log('HandleOK');
    ChangeTeacherInfoVisible.value=false;
    ChangeTeacherPasswordVisible.value=false;
}


//---------------------------------------------------------------------个人密码
// 修改密码
const ChangeTeacherPasswordVisible=ref(false);

// 准备提交密码的内容
const PasswordInfo=reactive({
    data:{
        
        password1:"",
        password2:"",
        Past_password: ""

    }
})

function ChangeTeacherPassword()
{
    ChangeTeacherPasswordVisible.value=true;
}

function CancelChangePasswordInfo()
{
    ChangeTeacherPasswordVisible.value=false;
}



// 提交修改密码
function SubmitChangePasswordInfo()
{
    console.log('修改密码');
    Loading.value=true;


    // 👇当axios成功创建后才关闭
    // ChangeTeacherInfoVisible.value=false;
    

    const PutPasswordInfoApi='http://123.56.21.208:8002/api/Users/UpdatePassword/';
    //  headers: { 'token':localStorage.getItem ("token") } 

    console.log('LoginStore.status.data.Token:',LoginStore.status.data.Token);

    const token=LoginStore.status.data.Token;


    console.log('配置请求');
    console.log('PasswordInfo.data',PasswordInfo.data);
    console.log('API:',PutPasswordInfoApi);
    console.log('config headers:',{headers: {Authorization: `Bearer ${token}`}});

    axios.put(PutPasswordInfoApi,PasswordInfo.data,{headers: {Authorization: `Bearer ${token}`}})
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                console.log('修改成功');
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
</style>