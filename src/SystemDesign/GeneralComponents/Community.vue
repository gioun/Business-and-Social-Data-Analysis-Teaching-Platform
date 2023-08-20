<!--  还没写传入参数 -->

<template>
    <a-list
      v-if="CommunityInfoList.data.length"
      :data-source="CommunityInfoList.data"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            author="匿名"
            :content="item.Content"
            :datetime="item.Time"
          />
        </a-list-item>
      </template>
    </a-list>


    <a-comment>

      <template #content>

        <a-form-item>
          <a-textarea v-model:value="AnoData" :rows="4" />
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" type="primary" @click="AxiosPostSubmitAnoInfo">
            添加评论
          </a-button>
        </a-form-item>

      </template>
    </a-comment>


</template>


<script setup>
import { defineComponent, ref,reactive } from 'vue';
import axios from 'axios';
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;

const props = defineProps({
    CourseID:{
        type:[String,Number,],
        default:null,
        required:true,
    }
});


//---------------------------------------------------------------------------------获取消息列表
const CommunityInfoList=reactive({
  data:[],
})

function AxiosPostGetCommunityInfoList()
{
  const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/AnoCommunityList/',
        data:{Course_id:props.CourseID},
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then(function (response) {
        console.log(response.data);
        CommunityInfoList.data=response.data;      
    })
    .catch(function (error) {
        // console.log('error--------------');
        // console.log(error);
        alert("Error,无法获取消息列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}
AxiosPostGetCommunityInfoList();



//---------------------------------------------------------------------------------发送消息

const AnoData=ref('');

function AxiosPostSubmitAnoInfo()
{
  const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/AnoCommunitysubmit/',
        data:{
          Course:props.CourseID,
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