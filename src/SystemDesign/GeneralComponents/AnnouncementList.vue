<!-- 由于教师和学生都包含公告的部分,因此也讲该组件独立出来,作为统一的组件 -->
<!-- 该组件的逻辑是,父组件选择课程后,向该组件发送公告列表缩略信息,包含查询详细信息所需的api,查询信息的编号,公告的标题 -->
<!-- 当选择展开特定的公告后,才发送axios请求,请求详细信息,随后再进行获取 -->

<template>
    
    <a-collapse 
    v-if="props.AnnouncementAbbrInfoList.length!=0"
    v-model:activeKey="activeKey" 
    @change="GetAnnouncementDetail(activeKey)"
    accordion
    >

        <!-- 这里的key需要处理,因为需要作为axios的调用的参数,而该参数是需要使用到公告的ID -->
        <a-collapse-panel v-for="(item,index) in props.AnnouncementAbbrInfoList" :key="item.ID" :header="item.Title">
            <a-card :title="AnnouncementDetail.Title" :bordered="true" style="width: auto">
                <a-descriptions title="">
                    <a-descriptions-item label="课程">{{AnnouncementDetail.data.Course}}</a-descriptions-item>
                    <a-descriptions-item label="发送教师">{{AnnouncementDetail.data.Teacher}}</a-descriptions-item>
                    <a-descriptions-item label="发布时间">{{ReturnStandardTime(AnnouncementDetail.data.Time)}}</a-descriptions-item>
                    <!-- 👇要处理附件为空时的情况 -->
                    <a-descriptions-item label="附件"><a :href="AnnouncementDetail.data.FilesLink" >附件</a></a-descriptions-item>
                    <!-- <a-descriptions-item v-if="LoginStore.status.data.IsTeacher"><a-button>删除公告</a-button></a-descriptions-item> -->
                </a-descriptions> 
                <a-divider orientation="left">详细信息</a-divider>
                <p>{{AnnouncementDetail.data.Content}}</p>
            </a-card>
        </a-collapse-panel>   
    </a-collapse>
    <a-empty v-if="props.AnnouncementAbbrInfoList.length==0"/>
  </template>


<script setup>
import {  ref,reactive } from 'vue';
import axios  from 'axios';

import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;


function ReturnStandardTime(TimeString)
{
    var d=new Date(TimeString);
    var datetime =  d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
    return datetime;
}

const activeKey = ref(['']);

const props = defineProps({
//   Api:{
//     type:String,
//     default:null,
//     required:true,
//   },
  
  // 公告缩略信息
  AnnouncementAbbrInfoList:{
    type:Object,
    default:null,
    required:true,
  },


});


// { "id": 3, "Title": "大家好，我们的系统第一次上线了", 
// "Content": "赞成！支持！",
// "Time": "2022-12-08T10:19:08.063979+08:00",

// "Course": "数据库系统概论", "Teacher": "张佳钇", 
// "FilesLink": "http://123.56.21.208:8002/api/Lesson/Notice_Download/3"}

// 👇课程公告详细信息,具体键值对需要根据api进行设计
const AnnouncementDetail=reactive({
    data:{
      id:null,
      Title:'图文信息标题',
      Content:'公告信息',
      Time:'时间',
      Course:'课程名称',
      Teacher:'教师名称',
      FilesLink:'此处为附件链接',
      
    }
})

function ChangeDetail()
{
  AnnouncementDetail.data={
    id: 14, Title: '请大家查看课堂公告', Content: '困死爹了', Time: '2022-12-14T17:05:06.593936+08:00', Course: '数据库系统概论',
    FilesLink: "http://123.56.21.208:8002/api/Lesson/Notice_Download/14",
    Teacher: "欧洋帆",

  }  
}


// 👇需要在展开的内容展开后触发
function AxiosPostGetAnnouncementDetail(API)
{
  axios.get(API,null,{headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {

      console.log("👇获取AnnouncementDetail.data");
      // AnnouncementDetail.data=response.data;
      console.log(response.data);
      AnnouncementDetail.data=response.data;

    })
    .catch(function (error) {
      // console.log('error--------------');
      // console.log(error);
      alert("Error,无法获取公告详细信息,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}


// 👇展开后触发展开函数
function GetAnnouncementDetail(ActiveKey)
{
    if(typeof ActiveKey === "undefined")
    {
      return ;
    }
    console.log('展开的页面是',ActiveKey);
    const API='http://123.56.21.208:8002/api/Lesson/NoticeInfoView/'+ActiveKey;
    // 👇触发回调函数
    AxiosPostGetAnnouncementDetail(API);

}

</script>