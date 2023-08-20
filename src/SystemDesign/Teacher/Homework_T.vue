<!-- 这个就是教师处理作业和测试的东西,包括下载和上传 -->

<template>
    <a-layout>
        <!-- 课程列表 -->
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
            <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">
                <a-card 
                :tab-list="tabListNoTitle"
                :active-tab-key="noTitleKey"
                @tabChange="key => onTabChange(key, 'noTitleKey')"
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >
                    <!-- 作业 -->
                    <div v-if="noTitleKey === 'article'">

                        <a-button @click="CreateTestVisible=true" v-if="CourseAbbrInfo.data.length!=0">新建测试</a-button>
                        
                        <a-empty v-if="TestAbbrList.data.length==0"/>

                        
                        <br>
                        <br>

                        <div>
                        <!-- 此处会进行重置,不适用折叠栏的形式,而是使用弹出框a-model的形式,即将class="Rewrite"的部分放在a-model中,然后将a-collapse改为不无法展开的形式,变成相当于是一个长条的按钮 -->
                            <a-collapse 
                            @change="AxiosGetGetTestDetail(ActiveTestKey)"
                            v-model:activeKey="ActiveTestKey" 
                            accordion>
                                <a-collapse-panel v-for="(item,index) in TestAbbrList.data" :key="item.ID" :header="item.Title">
                                    <!-- 使用table时,可以使用antdv的模板,处理不同的单元格 -->
                                    <!-- 下载和打分可是使用bodycell -->
                                    <!-- 名字使用固定列 -->
                                    <!-- 记录是否完成打分,处理样式变淡 -->
                                    <!-- 建议不要直接使用表格外部组件,而是在本页面写死 -->

                                    <div class="Rewrite">
                                        <a-card  :bordered="true" style="width: auto" :hoverable=false>
                                            <template #title>
                                                <a-statistic-countdown title="距离开始时间" :value="TestBeginDDL" format="D 天 H 时 m 分 s 秒" />
                                                <a-statistic-countdown title="距离结束时间" :value="TestDeadLine" format="D 天 H 时 m 分 s 秒" />


                                            </template>

                                            <a-descriptions title="">
                                                <a-descriptions-item label="题目">{{TestDetail.data.Title}}</a-descriptions-item>
                                                <a-descriptions-item label="发布教师">{{TestDetail.data.Teacher}}</a-descriptions-item>
                                                <a-descriptions-item label="发布时间">{{ReturnStandardTime(TestDetail.data.Time)}}</a-descriptions-item>
                                                <a-descriptions-item label="开始时间">{{ReturnStandardTime(TestDetail.data.BeginTime)}}</a-descriptions-item>
                                                <a-descriptions-item label="截止时间">{{ReturnStandardTime(TestDetail.data.EndTime)}}</a-descriptions-item>
                                                <a-descriptions-item label="权重">{{TestDetail.data.Weight}}</a-descriptions-item>
                                                <a-descriptions-item label="学生人数">{{TestDetail.data.student_count}}</a-descriptions-item>
                                                <!-- 👇要处理附件为空时的情况 -->
                                                <a-descriptions-item label="附件"><a :href="TestDetail.data.FilesLink" >附件</a></a-descriptions-item>
                                                <a-descriptions-item ><a-button @click="TestScoreVisible=true">查看学生提交</a-button></a-descriptions-item>
                                            </a-descriptions> 
                                            <a-divider orientation="left">详细信息</a-divider>
                                            <p>{{TestDetail.data.Introduction}}</p>


                                            <!-- 弹出作业打分框 -->
                                            <a-modal
                                            v-model:visible="TestScoreVisible"
                                            title="作业打分"
                                            width="1000px"
                                            @ok="TestScoreVisible=false"
                                            >

                                            <!-- 内容 -->
                                                <Table 
                                                v-if="TestScoreVisible"
                                                :HomeworkTestID="TestDetail.data.id"
                                                :CourseID="CourseAbbrInfo.data.Course_id"
                                                Type="Test"
                                                ></Table>
                                                
                                                <template #footer>
                                                    
                                                </template>
                                            </a-modal>
                                        </a-card>
                                    </div>
                                </a-collapse-panel>  
                            </a-collapse>
                        </div>
                    </div>

                    <!-- 测试 -->
                    <div v-else-if="noTitleKey === 'app'">
                        
                        <a-button @click="CreateHomeworkVisible=true" v-if="CourseAbbrInfo.data.length!=0">创建作业</a-button>
                        <a-empty v-if="HomeworkAbbrList.data.length==0"/>

                        
                        <br>
                        <br>

                        <div>
                            <a-collapse 
                            v-model:activeKey="ActiveHomeworkKey" 
                            @change="AxiosGetGetHomeworkDetail(ActiveHomeworkKey)"
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
                                                <a-statistic-countdown title="剩余时间" :value="DeadLine" format="D 天 H 时 m 分 s 秒" />
                                            </template>

                                            <a-descriptions title="">
                                                <a-descriptions-item label="题目">{{HomeworkDetail.data.Title}}</a-descriptions-item>
                                                <a-descriptions-item label="发布教师">{{HomeworkDetail.data.Teacher}}</a-descriptions-item>
                                                <a-descriptions-item label="发布时间">{{ReturnStandardTime(HomeworkDetail.data.Time)}}</a-descriptions-item>
                                                <a-descriptions-item label="截止时间">{{ReturnStandardTime(HomeworkDetail.data.Deadline)}}</a-descriptions-item>
                                                <a-descriptions-item label="权重">{{HomeworkDetail.data.Weight}}</a-descriptions-item>
                                                <a-descriptions-item label="是否小组作业">{{HomeworkDetail.data.is_group=='true'||HomeworkDetail.data.is_group==true?'是':'否'}}</a-descriptions-item>
                                                <a-descriptions-item label="已交人数">{{HomeworkDetail.data.homework_count}}</a-descriptions-item>
                                                <a-descriptions-item label="应交人数">{{HomeworkDetail.data.student_count}}</a-descriptions-item>
                                                <!-- 👇要处理附件为空时的情况 -->
                                                <a-descriptions-item label="附件"><a :href="HomeworkDetail.data.FilesLink" >附件</a></a-descriptions-item>
                                                <a-descriptions-item ><a-button @click="HomeworkScoreVisible=true">查看学生提交</a-button></a-descriptions-item>
                                            </a-descriptions> 
                                            <a-divider orientation="left">详细信息</a-divider>
                                            <p>{{HomeworkDetail.data.Introduction}}</p>


                                            <!-- 弹出作业打分框 -->
                                            <a-modal
                                            v-model:visible="HomeworkScoreVisible"
                                            title="作业打分"
                                            width="1000px"
                                            @ok="HomeworkScoreVisible=false"
                                            >

                                            <!-- 内容 -->
                                                <Table 
                                                v-if="HomeworkScoreVisible"
                                                :HomeworkTestID="HomeworkDetail.data.id"
                                                :CourseID="CourseAbbrInfo.data.Course_id"
                                                Type="Homework"
                                                :HomeworkIsGroup="HomeworkDetail.data.is_group"

                                                ></Table>
                                                
                                                <template #footer>
                                                    <!-- 不显示下面的确定和取消选项 -->
                                                </template>
                                            </a-modal>
                                        </a-card>

                                    
                                </div> 

                            </a-collapse-panel>  
                            </a-collapse>
                        </div>
                    </div>

                </a-card>
            </div>

        </a-layout-content>



    </a-layout>


<!-- 弹框 -->
<div>

    <!-- 发布作业的弹出框 -->
    <a-modal
    v-model:visible="CreateHomeworkVisible"
    title="发布作业"
    width="1000px"
    @ok="CreateHomeworkVisible=false"
    >
        <div>
            <a-form v-bind="layout">

                <a-form-item :name="['Homework', 'Title']" label="标题">
                    <a-input v-model:value="NewHomework.data.Title" placeholder="标题"/>
                </a-form-item>
                <br>
        
                <a-form-item :name="['Homework', 'Introduction']" label="详细信息">
                    <a-textarea v-model:value='NewHomework.data.Introduction' placeholder="详细信息"></a-textarea>
                </a-form-item>
                <br>

                <a-form-item :name="['Homework', 'Weight']" label="加权"> 
                    <a-input v-model:value="NewHomework.data.Weight" placeholder="加权" type="number"/>
                </a-form-item>
                <br>
        
                <a-form-item :name="['Homework', 'Deadline']" label="截止时间"> 
                    <a-date-picker v-model:value="NewHomework.data.Deadline" placeholder="截止时间" valueFormat="YYYY-MM-DD"/>
                    <a-time-picker v-model:value="HomeworkEndTimes" value-format="HH:mm:ss"/>
                </a-form-item>
                <br>

                <a-form-item :name="['Homework', 'is_group']" label="作业类型"> 
                    <a-radio-group v-model:value="NewHomework.data.is_group" name="HomeworkTypeRadioGroup">
                        <a-radio value="True">小组作业</a-radio>
                        <a-radio value="False">个人作业</a-radio>
                    </a-radio-group>
                    
                </a-form-item>
                <br>

                <a-form-item :name="['Homework', 'Files']" label="附件"> 
                    <input type="file" id="HomeworkInputFile" name="InputFiles">
                </a-form-item>
                        

            </a-form>
        </div>
        <template #footer>
            <a-button key="back" @click="CreateHomeworkVisible=false">取消创建</a-button>
            <a-popconfirm
            title="确定创建该作业?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="SubmitUploadHomework"
            >
                <a-button key="submit" type="primary" :loading="Loading">提交创建</a-button>
            </a-popconfirm>
        </template>
        
    </a-modal>

    <!-- 发布测试的弹出框 -->
    <a-modal
    v-model:visible="CreateTestVisible"
    title="发布测试"
    width="1000px"
    @ok="CreateTestVisible=false"
    >
        <div>
            <a-form v-bind="layout">

                <a-form-item :name="['Test', 'Title']" label="标题">
                    <a-input v-model:value="NewTest.data.Title" placeholder="标题"/>
                </a-form-item>
                <br>
        
                <a-form-item :name="['Test', 'Introduction']" label="详细信息">
                    <a-textarea v-model:value='NewTest.data.Introduction' placeholder="详细信息"></a-textarea>
                </a-form-item>
                <br>

                <a-form-item :name="['Test', 'Weight']" label="加权"> 
                    <a-input v-model:value="NewTest.data.Weight" placeholder="加权" type="number"/>
                </a-form-item>
                <br>
        
                <a-form-item :name="['Test', 'BeginTime']" label="开始时间"> 
                    <a-date-picker v-model:value="NewTest.data.BeginTime" placeholder="开始时间" valueFormat="YYYY-MM-DD"/>
                    <a-time-picker v-model:value="TestBeginTimes" value-format="HH:mm:ss"/>
                </a-form-item>
                <br>

                <a-form-item :name="['Test', 'EndTime']" label="截止时间"> 
                    <a-date-picker v-model:value="NewTest.data.EndTime" placeholder="截止时间" valueFormat="YYYY-MM-DD"/>
                    <a-time-picker v-model:value="TestEndTimes" value-format="HH:mm:ss"/>
                </a-form-item>
                <br>

                <a-form-item :name="['Homework', 'Files']" label="附件"> 
                    <input type="file" id="TestInputFile" name="InputFiles">
                </a-form-item>
                        
            </a-form>
        </div>
        <template #footer>
            <a-button key="back" @click="CreateTestVisible=false">取消创建</a-button>
            <a-popconfirm
            title="确定创建该测试?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="SubmitUploadTest"
            >
                <a-button key="submit" type="primary" :loading="Loading">提交创建</a-button>
            </a-popconfirm>
        </template>
        
    </a-modal>

</div>
</template>


<script setup>
import {ref,reactive} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // 显示提示信息
// 引入的自定义组件
import Table from './Components/Table.vue'; // 外部组件表格,用于打分
import CourseList from '../GeneralComponents/CourseList.vue'; // 外部组件课程列表

// 获取token
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;


function ReturnStandardTime(TimeString)
{
    var d=new Date(TimeString);
    var datetime =  d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
    return datetime;
}


// 外观预设
const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '700px'};

const tabListNoTitle = [{
    key: 'article',
    tab: '测试',
}, 
{
    key: 'app',
    tab: '作业',
}, 
];

const noTitleKey = ref('article');

const onTabChange = (value, type) => {
    console.log(value, type);
    if (type === 'key') {
    key.value = value;
    } else if (type === 'noTitleKey') {
    noTitleKey.value = value;
    }
};





//---------------------------------------------------------------------左侧课程列表
// 👇课程列表(新版)
// 课程列表

const CourseListApi=ref('');

const CourseAbbrInfo=reactive({
    data:'',
})


function MenuItemInfo(Info){
    console.log('接收从插槽中返回的数据');
    console.log(Info);
    CourseAbbrInfo.data=Info;
    

    AxiosPostGetHomeworkAbbrList(CourseAbbrInfo.data.Course_id);
    AxiosPostGetTestAbbrList(CourseAbbrInfo.data.Course_id);
};






//---------------------------------------------------------------------基本内容(以前的内容)

// 
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

const ActiveTestKey = ref(['']);

const ActiveHomeworkKey = ref(['']);

const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 20,
},
};



//---------------------------------------------------------------------发布作业和测试
const CreateHomeworkVisible=ref(false);
const Loading=ref(false);

const NewHomework=reactive({
    data:{
        Title:'',
        Introduction:'',
        Weight:'',
        Deadline:'',
        is_group:'',
        // 下面的是另外算的,不用写进去
        // Files:'',
        // Course_id:'',
    }
})

//  上传作业
const HomeworkEndTimes=ref('00:00:00');

function SubmitUploadHomework(){
    console.log('创建作业');
    Loading.value=true;
    // 获取文件,使用Formdata
    var File = document.getElementById('HomeworkInputFile').files[0];

    // console.log('File',File);

    // console.log('File.size:',File.size);

    // var FileSize=File.size/1024/1024;
    // console.log('FileSize',FileSize);

    // if(FileSize>10)
    // {
    //     message.error('文件大小超过10MB,当前文件大小'+FileSize+'MB');
    //     Loading.value=false;
    //     return ;
    // }

    

    var NewFormData = new FormData();

    for(const i in NewHomework.data)
    {
        if(NewHomework.data[i]==null)
        {

            message.error("请检查信息是否补充完整");
            Loading.value=false;
            return ;
        }
    }

    NewFormData.append('Title',NewHomework.data.Title);
    NewFormData.append('Introduction',NewHomework.data.Introduction);
    NewFormData.append('Weight',NewHomework.data.Weight);
    NewFormData.append('Deadline',NewHomework.data.Deadline+'T'+HomeworkEndTimes.value);
    NewFormData.append('Course_id',CourseAbbrInfo.data.Course_id);
    NewFormData.append('is_group',NewHomework.data.is_group);
    NewFormData.append("Files",File);

    const SubmitUploadHomeworkAPI='http://123.56.21.208:8002/api/Lesson/HomeworkInfoCreateView/';

    axios.post(SubmitUploadHomeworkAPI,NewFormData,{'Content-type' : 'multipart/form-data',headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {

    // 👇获取response.data

        console.log(response.data);
        message.success("发布作业成功");
        CreateHomeworkVisible.value=false;


        AxiosPostGetHomeworkAbbrList(CourseAbbrInfo.data.Course_id);
    })
    .catch(function (error) {

        alert("Error,无法发布作业,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
    

    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);
}




// 上传测试
const CreateTestVisible=ref(false);

const NewTest=reactive({
    data:{
        Title:'',
        Introduction:'',
        Weight:'',
        BeginTime:'',
        EndTime:'',
    }
})

const TestBeginTimes=ref('00:00:00');

const TestEndTimes=ref('00:00:00');

function SubmitUploadTest(){
    console.log('创建测试');
    Loading.value=true;

    // 获取文件,使用Formdata
    var File = document.getElementById('TestInputFile').files[0];

    // console.log('File',File);

    // console.log('File.size:',File.size);

    // var FileSize=File.size/1024/1024;
    // console.log('FileSize',FileSize);

    // if(FileSize>10)
    // {
    //     message.error('文件大小超过10MB,当前文件大小'+FileSize+'MB');
    //     Loaing.value=false;
    //     return ;
    // }

    var NewFormData = new FormData();

    for(const i in NewTest.data)
    {
        if(NewTest.data[i]==null||NewTest.data[i]=='')
        {
            message.error("请检查信息是否补充完整");
            Loading.value=false;
            return ;
        }
    }


    // console.log('NewTest.data.BeginTime',NewTest.data.BeginTime);

    console.log(NewTest.data);


    NewFormData.append('Course_id',CourseAbbrInfo.data.Course_id);
    NewFormData.append('Title',NewTest.data.Title);
    NewFormData.append('Introduction',NewTest.data.Introduction);
    NewFormData.append('Weight',NewTest.data.Weight);
    NewFormData.append('BeginTime',NewTest.data.BeginTime+'T'+TestBeginTimes.value);
    NewFormData.append('EndTime',NewTest.data.EndTime+'T'+TestEndTimes.value);
    NewFormData.append("Files",File);

    console.log(NewFormData.get('Course_id'));
    console.log(NewFormData.get('Title'));
    console.log(NewFormData.get('Introduction'));
    console.log(NewFormData.get('Weight'));
    console.log(NewFormData.get('BeginTime'));
    console.log(NewFormData.get('EndTime'));

    const SubmitUploadTestAPI='http://123.56.21.208:8002/api/Lesson/TestCreateView/';


    axios.post(SubmitUploadTestAPI,NewFormData,{'Content-type' : 'multipart/form-data',headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {

    // 👇获取response.data

        console.log(response.data);
        message.success("发布测试成功");
        CreateTestVisible.value=false;

        AxiosPostGetTestAbbrList(CourseAbbrInfo.data.Course_id);
    })
    .catch(function (error) {

        alert("Error,无法发布测试,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
    

    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);
}

//---------------------------------------------------------------------获取作业和测试缩略信息

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
        // console.log(response.data);
        HomeworkAbbrList.data=response.data;
    })
    .catch((error)=>{
        console.log(error);
        alert('无法查看作业列表,请检查网络或联系管理员');
    })
}

const TestAbbrList=reactive({
    data:[
        // {ID: '', Title: ''},
    ]
})
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
        // console.log(response.data);
        TestAbbrList.data=response.data;
    })
    .catch((error)=>{
        console.log(error);
        alert('无法查看作业列表,请检查网络或联系管理员');
    })
}



//---------------------------------------------------------------------获取作业测试详细信息

const HomeworkDetail=reactive({
    data:{
        Deadline: "2023-01-26T16:00:00",
        FilesLink: "http://123.56.21.208:8002/api/Lesson/Homework_Download/7",
        Introduction: "测试邮件提醒DDL",
        Teacher: "欧洋帆",
        Time:"2023-01-26T09:45:08.215245",
        Title: "邮件测试作业1",
        Weight:15,
        homework_count:0,
        id:7,
        is_group:false,
        student_count:3
    }
})

const DeadLine=ref('');

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
        url:'http://123.56.21.208:8002/api/Lesson/HomeworkInfoTeacher/'+ActiveHomeworkKey+'/',
        headers:{Authorization: `Bearer ${token}`},
    };

    console.log("获取作业详细信息Config");
    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        HomeworkDetail.data=response.data;
        DeadLine.value=(new Date(HomeworkDetail.data.Deadline)).getTime();

        console.log('DeadLine',ReturnStandardTime(HomeworkDetail.data.Deadline));

    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取作业详细信息,请检查网络或联系管理员');
    })

}


// 测试
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
        id:7,
        student_count:3
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
        url:'http://123.56.21.208:8002/api/Lesson/TestInfoTeacher/'+ActiveTestKey+'/',
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


//---------------------------------------------------------------------作业打分
// 需要将作业id传给Table,然后再处理
const HomeworkScoreVisible=ref(false);

const TestScoreVisible=ref(false);




</script>



<style scoped>


</style>