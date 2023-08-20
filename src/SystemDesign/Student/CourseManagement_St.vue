<!-- 该页面需要使用到课表组件和公告组件,在本页面独有的是小组信息 -->

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
        <!-- ------------------------------------------------------------------------------------------------查看公告------------------------------------------------------------ -->
        <!-- 右上公告 -->

        <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">
            <a-card
            :tab-list="tabListNoTitle"
            :active-tab-key="noTitleKey"
            @tabChange="key => onTabChange(key, 'noTitleKey')"
            :headStyle="CardHeadStyle"
            :bodyStyle="BodyStyle"
            >
                    <div v-if="noTitleKey === 'article'">
                                <!-- 使用公告的组件 -->
                                <AnnouncementList :AnnouncementAbbrInfoList="AnnouncementAbbrInfoList.data"></AnnouncementList>
                    </div>
                    
                    
                    <div v-else-if="noTitleKey === 'app'">
                    <!-- ------------------------------------------------------------------------------------------------小组------------------------------------------------------------ -->


                        <!-- 目前采用动态渲染的方式,由IfHasGroup决定当前小组的情况是否渲染 -->
                        <div v-if="IfHasGroup=='true'||IfHasGroup==true">
                            <!-- 显示已经加入小组的情况 -->
                            <a-card :title="GroupInfo.data.name" :bordered="true" style="width: auto" >
                                
                                <a-descriptions >
                                    <a-descriptions-item label="小组编号">{{GroupInfo.data.id}}</a-descriptions-item>
                                    <a-descriptions-item></a-descriptions-item>
                                    <a-descriptions-item></a-descriptions-item>
                                    <a-descriptions-item  v-for="(item,index) in GroupInfo.data.GroupPeople">{{item}}</a-descriptions-item>
                                    <a-descriptions-item></a-descriptions-item>
                                    <a-descriptions-item >
                                        <a-popconfirm
                                        title="确定退出该小组?"
                                        ok-text="Yes"
                                        cancel-text="No"
                                        @confirm="AxiosPostLeaveGroup"
                                        >
                                            <a-button >退出小组</a-button>
                                        </a-popconfirm>
                                        
                                    </a-descriptions-item>
                                </a-descriptions>
                            </a-card>
                        </div>

                        <div v-if="IfHasGroup=='false'||IfHasGroup==false">
                            <!-- 没有选择小组时渲染,获取已经建成的小组列表,增加创建小组的按钮 -->

                            <div style="padding: 20px">
                                

                                <a-row :gutter="[16,16]" >

                                    <!-- 创建小组 -->
                                    <a-col :span="12" v-if="CourseAbbrInfo.data!=null">
                                        <a-card title="创建新小组" :bordered="true">
                                            <a-form>
                                                <a-form-item 
                                                :name="['CreateGroup', 'GroupName']" 
                                                label="小组姓名"
                                                >
                                                    <a-input type="text" v-model:value="CreateGroupName" />
                                                </a-form-item>
                                                <a-form-item >
                                                    <a-button  html-type="submit" @click="AxiosPostCreateGroup" >确认创建</a-button>
                                                </a-form-item>     
                                            </a-form>
                                        </a-card>
                                    </a-col>

                                    <!-- 加入小组 -->
                                    <a-col :span="12" v-if="CourseAbbrInfo.data!=null">
                                        <a-card title="加入小组" :bordered="true">
                                            <a-form>
                                                <a-form-item 
                                                :name="['JoinGroup', 'GroupID']" 
                                                label="小组ID"
                                                >
                                                    <a-input type="text" v-model:value="GroupIDToJoined"/>
                                                </a-form-item>
                                                <a-form-item >
                                                    <a-popconfirm
                                                    title="确定加入该小组?"
                                                    ok-text="Yes"
                                                    cancel-text="No"
                                                    @confirm="AxiosPostJoinGroup"
                                                    >
                                                        <a-button  html-type="submit" >确认加入</a-button>
                                                    </a-popconfirm>
                                                    
                                                </a-form-item>     
                                            </a-form>
                                        </a-card>
                                    </a-col>
                                    
                                    <a-col :span="24" v-if="GroupList.data.length==0">
                                        <a-card>
                                            <a-empty description="暂无小组信息"/>
                                        </a-card>
                                    </a-col>
                                    <a-col :span="8" v-for="(item,index) in GroupList.data">
                                        <a-card :title="item.Group" :bordered="true">
                                            <p>组长:{{item.Leader}}</p>
                                        </a-card>
                                    </a-col>
                                
                                </a-row>
                            </div>

                        </div>
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
import AnnouncementList from '../GeneralComponents/AnnouncementList.vue';
import { message } from 'ant-design-vue'; // 显示提示信息
// 登录状态管理Pinia
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;


// 时间函数处理
function ReturnStandardTime(TimeString)
{
    var d=new Date(TimeString);
    var datetime =  d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
    return datetime;
}


// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '700px'};

const tabListNoTitle = [{
    key: 'article',
    tab: '课程公告',
}, 
{
    key: 'app',
    tab: '小组',
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





//-------------------------------------------------------------------------------------------------左侧课程列表
// 页面开始渲染时需要获取课程列表需要使用的Api
const CourseListApi=ref('xxxxx');

const CourseAbbrInfo=reactive({
    data:null,
})

// 选中课程后收到返回信息,触发该函数,可以触发不同的结果
// 需要处理成能够发给AxiosPostGetAnnouncementList要用的那部分
// 👉注意,除了给公告外,还应该给小组
function MenuItemInfo(Info){
    console.log('接收从插槽中返回的数据');
    console.log(Info);

    CourseAbbrInfo.data=Info;
    
    // 调用函数,获取公告信息列表
    AxiosPostGetAnnouncementList(Info.Course_id);
    AxiosPostGetGroupStatus(Info.Course_id);
    
};



//-------------------------------------------------------------------------------------------------公告缩略信息
// 缩略信息,需要根据api进行修改,初始状态下为空
const AnnouncementAbbrInfoList=reactive({
    data:[
    ],
})

function AxiosPostGetAnnouncementList(CourseID)
{
    const GetAnnouncementIDListAPI='http://123.56.21.208:8002/api/Lesson/NoticeIDListView/';
    axios.post(GetAnnouncementIDListAPI,
    {"Course_id":CourseID},
    {headers: {Authorization: `Bearer ${token}`}},
    )
    .then(function (response) {

        // 👇获取AnnouncementAbbrInfoList.data
        // AnnouncementAbbrInfoList.data=response.data;
        console.log('👇课程公告列表ID:');
        console.log(response.data);
        AnnouncementAbbrInfoList.data=response.data;

    })
    .catch(function (error) {
        alert("Error,无法获取公告列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}






// -------------------------------------------------------------------------------------------------获取小组信息(已加入和未加入)
const IfHasGroup=ref(false);
const GroupInfo=reactive({
    data:{
        name:'',
        id:'',
        GroupPeople:[
        ],
    }

})
// 准备加入小组
// 小组的信息可能要加上ID,便于向后端发送请求
// 请求小组状态及相关信息
function AxiosPostGetGroupStatus(CourseID)
{

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/GroupInfoView/',
        data:{Course_id:CourseID},
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then(function (response) {
        console.log(response.data);
        // 加入小组就获取小组列表信息
        if(response.data.message=='未加入小组')
        {
            IfHasGroup.value=false;
            AxiosPostGetGroupList(CourseID);
        }
        else
        {
            IfHasGroup.value=true;
            GroupInfo.data=response.data;
        }
        

    })
    .catch(function (error) {
        // console.log('error--------------');
        // console.log(error);
        alert("Error,无法获取小组状态,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
};

const GroupList=reactive({
    data:[
    // {Leader: '', Group: ''},
    ]
})

function AxiosPostGetGroupList(CourseID)
{
    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/GroupInfoListView/',
        data:{Course_id:CourseID},
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then(function (response) {
        console.log(response.data);
        GroupList.data=response.data;

        

    })
    .catch(function (error) {
        // console.log('error--------------');
        console.log(error);
        alert("Error,无法获取小组列表状态,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}





// -------------------------------------------------------------------------------------------------加入小组


const GroupIDToJoined=ref('');

function AxiosPostJoinGroup()
{
    console.log(GroupIDToJoined.value);


    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/Group_Join/',
        data:{
            Course_id:CourseAbbrInfo.data.Course_id,
            Group_id:GroupIDToJoined.value,
        },
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then(function (response) {
        message.success("加入成功");
        console.log(response.data);
        IfHasGroup.value=true;
        // 相当于刷新,获取小组信息

        setTimeout(() => {
        AxiosPostGetGroupStatus(CourseAbbrInfo.data.Course_id);
        }, 1000);
        
    })
    .catch(function (error) {
        // console.log('error--------------');
        console.log(error);

        alert("Error,无法加入小组,请检查网络或联系管理员");
    })
    .then(function () {
    }); 

    

}


// -------------------------------------------------------------------------------------------------创建小组
const CreateGroupName=ref('');
function AxiosPostCreateGroup()
{

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/GroupInfoCreateView/',
        data:{
            Course_id:CourseAbbrInfo.data.Course_id,
            name:CreateGroupName.value,
        },
        headers: {Authorization: `Bearer ${token}`},
    }

    console.log(Config);

    axios.request(Config)
    .then(function (response) {
        message.success("创建成功");
        console.log(response.data);
        IfHasGroup.value=true;

        // 相当于刷新,获取小组信息
        setTimeout(() => {
        AxiosPostGetGroupStatus(CourseAbbrInfo.data.Course_id);
        }, 1000);
    })
    .catch(function (error) {
        // console.log('error--------------');
        console.log(error);
        alert("Error,无法创建小组,请检查网络或联系管理员");
    })
    .then(function () {
    }); 



}

// -------------------------------------------------------------------------------------------------退出小组


function AxiosPostLeaveGroup()
{

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/GroupStudentDel/',
        data:{
            Course_id:CourseAbbrInfo.data.Course_id,
        },
        headers: {Authorization: `Bearer ${token}`},
    }

    console.log(Config);


    axios.request(Config)
    .then(function (response) {

        message.success("退出成功");
        console.log(response.data);
        IfHasGroup.value=false;
        // 相当于刷新,获取小组信息
        // setTimeout(() => {
        // AxiosPostGetGroupStatus(CourseAbbrInfo.Course_id);
        // }, 3000);


    })
    .catch(function (error) {
        // console.log('error--------------');
        console.log(error);
        alert("Error,无法退出小组,请检查网络或联系管理员");
    })
    .then(function () {
    }); 



}


// 👇退出课程
function DropClass()
{
    axios.post(API)
    .then(function (response) {
        // 退课后的结果,应该是将课程列表重新加载
       

    })
    .catch(function (error) {
        // console.log('error--------------');
        // console.log(error);
        alert("Error,无法退课,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}

</script>

<style scoped>

</style>