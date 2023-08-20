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
        
        

        <a-layout-content>
            
            <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">
                <a-card title="匿名社区" 
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >
                    <div>
                        <a-empty v-if="!CourseAbbrInfo.data.Course_id"/>
                        <!-- <Community :CourseID="CourseAbbrInfo.data.Course_id" v-if="CourseAbbrInfo.data.Course_id"></Community> -->

                        
                        <a-list
                        v-if="CommunityInfoList.data.length"
                        :data-source="CommunityInfoList.data"
                        item-layout="horizontal"
                        :pagination="PaginationSet"
                        >
                        <template #renderItem="{ item }">
                            <a-list-item>
                            <a-comment
                                author="匿名"
                                :content="item.Content"
                                :datetime="ReturnStandardTime(item.Time)"
                            />
                            </a-list-item>
                        </template>
                        </a-list>
                        
                        

                        <a-comment>
                        <template #content>

                            <a-form-item>
                                <a-textarea v-model:value="AnoData" :rows="4" />
                            </a-form-item>
                            <br>
                            <a-form-item>
                                <a-button html-type="submit"  @click="AxiosPostSubmitAnoInfo" :disabled="!CourseAbbrInfo.data.Course_id">添加评论</a-button>
                            </a-form-item>

                        </template>
                        </a-comment>

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
import Community from '../GeneralComponents/Community.vue';

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

const PaginationSet={
    defaultPageSize:5,

}

const True=true;


// 课程列表
// 👇页面开始渲染时需要获取课程列表需要使用的Api
const CourseListApi=ref('xxxxx');


const CourseAbbrInfo=reactive({
    data:{
        Course_id:null,
        Name:null,
    },
});

function MenuItemInfo(Info){
    console.log('接收从插槽中返回的数据');
    console.log(Info);
    CourseAbbrInfo.data=Info;


    // 👇调用函数,获取公告信息列表
    // AxiosPostGetAnnouncementList(Info.api1)

    // AxiosPostGetGroupStatus(Info.api2)
    AxiosPostGetCommunityInfoList();
};




//---------------------------------------------------------------------------------获取消息列表
const CommunityInfoList=reactive({
  data:[],
})

function AxiosPostGetCommunityInfoList()
{
  const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/AnoCommunityList/',
        data:{Course_id:CourseAbbrInfo.data.Course_id},
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then(function (response) {
        console.log(response.data);
        CommunityInfoList.data=response.data.reverse();      
        
    })
    .catch(function (error) {
        // console.log('error--------------');
        // console.log(error);
        alert("Error,无法获取消息列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}




//---------------------------------------------------------------------------------发送消息

const AnoData=ref('');

function AxiosPostSubmitAnoInfo()
{
  const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/AnoCommunitysubmit/',
        data:{
          Course:CourseAbbrInfo.data.Course_id,
          content:AnoData.value,
        },
        headers: {Authorization: `Bearer ${token}`},
    }
  console.log(Config);

    axios.request(Config)
    .then(function (response) {
        console.log(response.data);

        AnoData.value='';
        // 刷新获取信息
        AxiosPostGetCommunityInfoList();
    })
    .catch(function (error) {
        // console.log('error--------------');
        // console.log(error);
        alert("Error,无法获取消息列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}




</script>



<style scoped>

</style>