<template>
    <a-layout>
        <a-layout-sider width="300"  style="background: #fff ; ">   
            <div :style="{ magin:'5px', padding: '5px',}">
                <a-card title="课程列表" 
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >
                    <CourseList :Api="CourseListApi" @SelectedItemInfo="MenuItemInfo"></CourseList>      
                </a-card>
            </div>
            
        </a-layout-sider>        
    

        <a-layout-content >

            <!-- 页面路由出口,所有页面在此渲染出来 -->

            
                <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">
                    <a-card title="测试" 
                    :headStyle="CardHeadStyle"
                    :bodyStyle="BodyStyle"
                    >
                        <div style="width: auto;">
                            <!-- 测试的列表 -->
                            <h2>测试</h2>

                            <a-empty v-if="TestAbbrList.data.length==0"/>

                            <a-collapse 
                            v-model:activeKey="ActiveTestKey" 
                            @change="AxiosGetGetTestDetail(ActiveTestKey)"
                            v-if="TestAbbrList.data.length!=0"
                            accordion>

                                <!-- activeKey直接设置为作业的ID号 -->
                                <a-collapse-panel v-for="(item,index) in TestAbbrList.data" :key="item.ID" :header="item.Title">

                                    <div class="Rewrite">
                                        <a-card  :bordered="true" style="width: auto" :hoverable=false>
                                            <template #title>
                                                <a-statistic-countdown title="距离开始时间" :value="TestBeginDDL" format="D 天 H 时 m 分 s 秒" />
                                                <a-statistic-countdown title="距离结束时间" :value="TestDeadLine" format="D 天 H 时 m 分 s 秒" />
                                            </template>

                                            <a-alert
                                            :type="TestDetail.data.finish=='已提交'?'success':'warning'"
                                            >
                                                <template #description>
                                                    <a-descriptions title="">
                                                        <a-descriptions-item label="题目">{{TestDetail.data.Title}}</a-descriptions-item>
                                                        <a-descriptions-item label="发布教师">{{TestDetail.data.Teacher}}</a-descriptions-item>
                                                        <a-descriptions-item label="开始时间">{{ReturnStandardTime(TestDetail.data.BeginTime)}}</a-descriptions-item>
                                                        <a-descriptions-item label="截止时间">{{ReturnStandardTime(TestDetail.data.EndTime)}}</a-descriptions-item>
                                                        <a-descriptions-item label="权重">{{TestDetail.data.Weight}}</a-descriptions-item>
                                                        <!-- 👇要处理附件为空时的情况 -->
                                                        <a-descriptions-item label="附件"><a :href="TestDetail.data.FilesLink" >附件</a></a-descriptions-item>
                                                        <a-descriptions-item label="状态">{{TestDetail.data.finish}}</a-descriptions-item>
                                                        <a-descriptions-item ><a-button @click="SubmitTestVisible=true">提交测试</a-button></a-descriptions-item>
                                                    </a-descriptions> 
                                                    <a-divider orientation="left">详细信息</a-divider>
                                                    <p>{{TestDetail.data.Introduction}}</p>
                                                </template>
                                            </a-alert>

                                            <!-- 弹出测试提交框 -->
                                            <a-modal
                                            v-model:visible="SubmitTestVisible"
                                            title="提交测试"
                                            @ok="SubmitTestVisible=false"
                                            >
                                                <input id="SubmitTestFile" type="file"/>
                                                <template #footer>
                                                    <a-popconfirm
                                                    title="确定提交该作业?"
                                                    ok-text="Yes"
                                                    cancel-text="No"
                                                    @confirm="SubmitTest"
                                                    >
                                                        <a-button key="submit" type="primary" :loading="Loading">提交</a-button>
                                                    </a-popconfirm>
                                                </template>
                                            </a-modal>

                                        </a-card>
                                    </div> 
                                </a-collapse-panel>  
                            </a-collapse>



                        
                        <a-divider/>

                        
                    
                        
                            <h2>作业</h2>
                            <!-- <a-button @click="IsGroupLeader=!IsGroupLeader">修改组长状态</a-button> -->

                            <!-- 没有显示的时候的空白 -->
                            <a-empty v-if="HomeworkAbbrList.data.length==0"/>

                            <a-collapse 
                            v-model:activeKey="ActiveHomeworkKey" 
                            @change="AxiosGetGetHomeworkDetail(ActiveHomeworkKey)"
                            v-if="HomeworkAbbrList.data.length!=0"
                            accordion>

                                <!-- activeKey直接设置为作业的ID号 -->
                                <a-collapse-panel v-for="(item,index) in HomeworkAbbrList.data" :key="item.ID" :header="item.Title">
                                    

                                    <!-- 使用table时,可以使用antdv的模板,处理不同的单元格 -->
                                    <!-- 下载和打分可是使用bodycell -->
                                    <!-- 名字使用固定列 -->
                                    <!-- 记录是否完成打分,处理样式变淡 -->
                                    <!-- 建议不要直接使用表格外部组件,而是在本页面写死 -->

                                    <div class="Rewrite">
                                        <a-card  :bordered="true" style="width: auto" :hoverable=false>
                                            <template #title>
                                                <a-statistic-countdown title="剩余时间" :value="DealLine" format="D 天 H 时 m 分 s 秒" />
                                            </template>

                                            <a-alert
                                            :type="HomeworkDetail.data.finish=='已提交'?'success':'warning'"
                                            >
                                                <template #description>
                                                    <a-descriptions title="">
                                                        <a-descriptions-item label="题目">{{HomeworkDetail.data.Title}}</a-descriptions-item>
                                                        <a-descriptions-item label="发布教师">{{HomeworkDetail.data.Teacher}}</a-descriptions-item>
                                                        <a-descriptions-item label="发布时间">{{ReturnStandardTime(HomeworkDetail.data.Time)}}</a-descriptions-item>
                                                        <a-descriptions-item label="截止时间">{{ReturnStandardTime(HomeworkDetail.data.Deadline)}}</a-descriptions-item>
                                                        <a-descriptions-item label="权重">{{HomeworkDetail.data.Weight}}</a-descriptions-item>
                                                        <a-descriptions-item label="是否小组作业">{{HomeworkDetail.data.is_group=='true'||HomeworkDetail.data.is_group==true?'是':'否'}}</a-descriptions-item>
                                                        <!-- 👇要处理附件为空时的情况 -->
                                                        <a-descriptions-item label="附件"><a :href="HomeworkDetail.data.FilesLink" >附件</a></a-descriptions-item>
                                                        <a-descriptions-item label="状态">{{HomeworkDetail.data.finish}}</a-descriptions-item>
                                                        <a-descriptions-item ><a-button @click="SubmitHomeworkVisible=true">提交作业</a-button></a-descriptions-item>
                                                    </a-descriptions> 
                                                    <a-divider orientation="left">详细信息</a-divider>
                                                    <p>{{HomeworkDetail.data.Introduction}}</p>
                                                </template>
                                            </a-alert>

                                            <!-- 弹出作业提交框 -->
                                            <a-modal
                                            v-model:visible="SubmitHomeworkVisible"
                                            title="提交作业"
                                            @ok="SubmitHomeworkVisible=false"
                                            >
                                                <input id="SubmitHomeworkFile" type="file"/>
                                                <template #footer>
                                                    <a-popconfirm
                                                    title="确定提交该作业?"
                                                    ok-text="Yes"
                                                    cancel-text="No"
                                                    @confirm="SubmitHomework"
                                                    >
                                                        <a-button key="submit" type="primary" :loading="Loading">提交</a-button>
                                                    </a-popconfirm>
                                                </template>
                                            </a-modal>

                                        </a-card>
                                    </div> 
                                </a-collapse-panel>  
                            </a-collapse>
                            


                            
                        </div>
                    </a-card>
                </div>
            
        </a-layout-content>


    </a-layout>
</template>


<script setup>
import {ref,reactive} from 'vue';
import axios from 'axios';
import CourseList from '../GeneralComponents/CourseList.vue';

import { message } from 'ant-design-vue'; // 显示提示信息
// 获取token
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;


// 整体预设
function ReturnStandardTime(TimeString)
{
    var d=new Date(TimeString);
    var datetime =  d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
    return datetime;
}

const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '700px'};


// 课程列表
// 👇页面开始渲染时需要获取课程列表需要使用的Api
const CourseListApi=ref('xxxxx');

const CourseAbbrInfo=reactive({
    data:'',
})


// 👇选中课程后收到返回信息,触发该函数,可以触发不同的结果
// 需要处理成能够发给AxiosPostGetAnnouncementList要用的那部分
// 👉注意,除了给公告外,还应该给小组
function MenuItemInfo(Info){
    console.log('接收从插槽中返回的数据');
    console.log(Info);
    CourseAbbrInfo.data=Info;
    
    AxiosPostGetHomeworkAbbrList(CourseAbbrInfo.data.Course_id)
    AxiosPostGetTestAbbrList(CourseAbbrInfo.data.Course_id)
};

//---------------------------------------------------------------------获取作业测试缩略信息

const HomeworkAbbrList=reactive({
    data:[
        // {ID: '', Title: ''},
    ]
})
function AxiosPostGetHomeworkAbbrList(CourseID)
{
    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/HomeworkIdList/',
        data: {Course_id:CourseID},
        headers:{Authorization: `Bearer ${token}`},
    };

    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        HomeworkAbbrList.data=response.data;
    })
    .catch((error)=>{
        console.log(error);
        alert('无法查看作业列表,请检查网络或联系管理员');
    })
}

// --------------------------------------测试

const TestAbbrList=reactive({
    data:[
        // {ID: '', Title: ''},
    ]
});
function AxiosPostGetTestAbbrList(CourseID)
{
    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/TestIdList/',
        data: {Course_id:CourseID},
        headers:{Authorization: `Bearer ${token}`},
    };

    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        TestAbbrList.data=response.data;
    })
    .catch((error)=>{
        console.log(error);
        alert('无法查看作业列表,请检查网络或联系管理员');
    })
}


//---------------------------------------------------------------------获取作业测试详细信息


const ActiveHomeworkKey = ref(['']);

const HomeworkDetail=reactive({
    data:{
        Deadline: "",
        FilesLink: "",
        Introduction: "",
        Teacher: "",
        Time:"",
        Title: "",
        Weight:null,
        id:null,
        is_group:false,
        finish:null,

    }
})

const DealLine=ref('');

function AxiosGetGetHomeworkDetail(ActiveHomeworkKey)
{
    if(typeof ActiveHomeworkKey === "undefined")
    {
      return ;
    }
    console.log('展开的页面是',ActiveHomeworkKey);
    // const API='http://123.56.21.208:8002/api/Lesson/NoticeInfoView/'+ActiveKey;
    // // 👇触发回调函数
    // AxiosPostGetAnnouncementDetail(API);

    const Config={
        method:'get',
        url:'http://123.56.21.208:8002/api/Lesson/HomeworkInfoStudent/'+ActiveHomeworkKey+'/',
        headers:{Authorization: `Bearer ${token}`},
    };

    console.log("获取作业详细信息Config");
    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        HomeworkDetail.data=response.data;
        DealLine.value=(new Date(HomeworkDetail.data.Deadline)).getTime();

    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取作业详细信息,请检查网络或联系管理员');
    })

}


// --------------------------------------测试
const ActiveTestKey = ref(['']);


const TestDetail=reactive({
    data:{
        BeginTime: "2023-01-26T16:00:00",
        EndTime: "2023-01-26T16:00:00",
        FilesLink: "http://123.56.21.208:8002/api/Lesson/Homework_Download/7",
        Introduction: "测试邮件提醒DDL",
        Teacher: "欧洋帆",
        Time:"2023-01-26T09:45:08.215245",
        Title: "邮件测试作业1",
        Weight:15,
        finish:"已提交\未提交",
        id:7,
        
    }
})

const TestBeginDDL=ref('');
const TestDeadLine=ref('');

function AxiosGetGetTestDetail(ActiveTestKey)
{
    if(typeof ActiveTestKey === "undefined")
    {
      return ;
    }
    console.log('展开的页面是',ActiveTestKey);
;


    const Config={
        method:'get',
        url:'http://123.56.21.208:8002/api/Lesson/TestInfoStudent/'+ActiveTestKey+'/',
        headers:{Authorization: `Bearer ${token}`},
    };

    console.log("获取作业详细信息Config");
    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        TestDetail.data=response.data;
        TestBeginDDL.value=(new Date(TestDetail.data.BeginTime)).getTime();
        TestDeadLine.value=(new Date(TestDetail.data.EndTime)).getTime();

    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取测试详细信息,请检查网络或联系管理员');
    })

}






// 👇下面的好像已经没用了
// 对于作业,有两种状态:完成和为完成
// 按照小组,又进行区分,直接从后台获取小组情况,对提交按钮进行disable


const HomeworkList=reactive({
    data:[
        {
            HomeworkID:'1',
            HomeworkTitle:'homework1',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time1',
            HomeworkType:'',// 或者IsGroupWork
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:false,
        },
        {
            HomeworkID:'2',
            HomeworkTitle:'homework2',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time2',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:true,
        },
        {
            HomeworkID:'3',
            HomeworkTitle:'homework3',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time3',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:true,
        },
        
    ]
})

const TestHomeworkData=[
        {
            HomeworkID:'1',
            HomeworkTitle:'homework1',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time1',
            HomeworkType:'',// 或者IsGroupWork
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:false,
        },
        {
            HomeworkID:'2',
            HomeworkTitle:'homework2',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time2',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:false,
        },
        {
            HomeworkID:'3',
            HomeworkTitle:'homework3',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time3',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:false,
        },
        {
            HomeworkID:'4',
            HomeworkTitle:'homework4',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time4',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:true,
        },
        {
            HomeworkID:'5',
            HomeworkTitle:'homework5',
            HomeworkIntro:'HomeworkIntro',
            HomeworkWeight:'',
            HomeworkDDL:'time5',
            HomeworkType:'',
            HomeworkFile:'',// 一串API
            IfHomeworkFinished:true,
        },
        
    ]

const IsGroupLeader=ref(false);

//---------------------------------------------------------------------提交作业测试
const SubmitHomeworkVisible=ref(false);

const Loading=ref(false);

function SubmitHomework()
{
    console.log('提交作业');
    Loading.value=true;

    // 获取文件,使用Formdata
    var File = document.getElementById('SubmitHomeworkFile').files[0];

    var FileSize=File.size/1024;
    if(FileSize>10)
    {
        message.error('文件大小超过10MB,当前文件大小'+FileSize+'MB');
        return ;
    }

    var NewFormData = new FormData();
    NewFormData.append('Course_id',CourseAbbrInfo.data.Course_id);
    NewFormData.append('Homework_id',HomeworkDetail.data.id);
    NewFormData.append("Files",File);

    console.log(NewFormData.get("Course_id"));
    console.log(NewFormData.get("Homework_id"));

    const SubmitHomeworkAPI='http://123.56.21.208:8002/api/Lesson/Homeworksubmit/';


    axios.post(SubmitHomeworkAPI,NewFormData,{'Content-type' : 'multipart/form-data',headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {
    // 👇获取response.data
        console.log(response.data);

        if(response.data.message=='已超过作业截止时间')
        {
            message.error(response.data.message);
        }
        else
        {
            message.success("提交作业成功");
            SubmitHomeworkVisible.value=false;
        }
        
    })
    .catch(function (error) {
        alert("Error,无法提交作业,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
    

    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);
}



// -----------------测试
const SubmitTestVisible=ref(false);

function SubmitTest()
{
    console.log('提交测试');
    Loading.value=true;

    // 获取文件,使用Formdata
    var File = document.getElementById('SubmitTestFile').files[0];

    var FileSize=File.size/1024;
    if(FileSize>10)
    {
        message.error('文件大小超过10MB,当前文件大小'+FileSize+'MB');
        return ;
    }

    var NewFormData = new FormData();
    NewFormData.append('Course_id',CourseAbbrInfo.data.Course_id);
    NewFormData.append('Test_id',TestDetail.data.id);
    NewFormData.append("Files",File);

    console.log(NewFormData.get("Course_id"));
    console.log(NewFormData.get("Test_id"));
    console.log(NewFormData.get("Files"));

    const SubmitTestAPI='http://123.56.21.208:8002/api/Lesson/Testsubmit/';


    axios.post(SubmitTestAPI,NewFormData,{'Content-type' : 'multipart/form-data',headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {
    // 👇获取response.data
        if(response.data.message=='已超过测试截止时间')
        {
            message.error(response.data.message);
        }
        else
        {
            message.success("提交测试成功");
            SubmitTestVisible.value=false;
        }



    })
    .catch(function (error) {
        alert("Error,无法提交测试,请检查网络或联系管理员");
    })
    .then(function () {
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
    color: #0000EE;
}

.void{
    width: 100%;
    height: 200px;
}

.hw{
    width: 500px;
    height: 800px;
    margin: 0 auto;
}

.form-control{
    width: 100%;
    height: 35px;
}

label{
    font-size: 15px;
}

#exampleInputFile{
    width: 120px;
    height: 30px;
    font-size: 8px;
}

/* button{
    width: 65px;
    height: 30px;
    font-size: 8px;
    color: white;
    background-color: rgb(33, 125, 187);
} */

.classlist{
    margin: 20px;
    width: 30%;
    height: 500px;
    border: 5px solid rgb(255, 82, 82);
    display: inline-block;
}

.content{
    display: flex;
}
.hwlist{
    margin: 50px;
    width: 60%;
    height: auto;
    border: 5px solid rgb(0, 88, 164);
    overflow: auto;
}

.hw{
    margin: 5px;
    padding: 2px;
    width: 80%;
    min-height: 300px;
    border: 2px solid rgb(1, 154, 65);
}


.row-clearfix{
    width: 200px;
}

</style>