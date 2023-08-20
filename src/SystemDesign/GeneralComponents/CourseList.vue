<!-- 由于除了个人信息外的所有页面都需要用到课程列表,所以直接使用统一的课程列表组件进行使用 -->
<!-- 根据沟通结果,加载课程列表的 -->


<template>
    <div>
      
      <!-- 左侧课程列表组件,现实左侧课程列表信息 -->
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        @click="HandleClick"
      >
        <a-menu-item v-for="(item,index) in LessonInfoList.data" :key="index" :title="item.Name">  
            {{item.Name}}
            
        </a-menu-item>
      </a-menu>
    </div>
</template>
<script setup>
import { ref,reactive, toRefs } from 'vue';
import axios from 'axios';
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();

// 👇使用组件时需要传递的值:Api,通过api可以获取不同的数据需求以及该页面点击对应课程后需要展示的数据
const props = defineProps({
  Api:{
    type:String,
    default:null,
    required:true,
  },
});




// 👇-------------------------------------------------------------------向后端发送请求获取课程列表

// 课程列表数据
const LessonInfoList=reactive({
    data:[
      {Course_id: '', Name: ''},
    ] 
})

// 向后台发送数据,根据存储的状态记录的ID进行分别处理
function AxiosPostGetList(){
    const GetTeacherCourseListAPI='http://123.56.21.208:8002/api/Lesson/CourseTeacherIDList/';
    const GetStudentCourseListAPI='http://123.56.21.208:8002/api/Lesson/CourseStudentIDList/';
    var API='';
    if(LoginStore.status.data.IsTeacher)
    {
      API=GetTeacherCourseListAPI;
    }
    else if(LoginStore.status.data.IsStudent)
    {
      API=GetStudentCourseListAPI;
    }

    axios.post(API,{id:LoginStore.status.data.ID},{headers: {Authorization: `Bearer ${LoginStore.status.data.Token}`}})
    .then(function (response) {

      // 👇获取response.data
      // LessonInfoList.data=response.data;
      console.log(response.data);
      LessonInfoList.data=response.data;

    })
    .catch(function (error) {
      // console.log('error--------------');
      // console.log(error);
      alert("Error,无法获取课程列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
};
// 页面渲染后向后端发送数据
AxiosPostGetList();




// 👇页面创建后立刻获取课程列表数据
// AxiosPostGetList(prop.Api);

const state = reactive({
selectedKeys: [''],
});

// 点击向引用的父组件发送信息
const Emit=defineEmits(['SelectedItemInfo']);

function HandleClick(Course)
{
    // console.log(Course.item);
    // console.log(Course.key);
    // console.log(Course.keyPath);
    console.log('HandleClick');
    console.log(LessonInfoList.data[Course.key]);
    Emit('SelectedItemInfo',LessonInfoList.data[Course.key]);
};









</script>