<template>
    <a-form v-bind="layout">

        <a-form-item :name="['Announcement', 'Title']" label="标题">
            <a-input v-model:value="FormState.Announcement.Title" />
        </a-form-item>

        <a-form-item :name="['Announcement', 'Content']" label="详细信息">
            <a-textarea v-model:value='FormState.Announcement.Content'></a-textarea>
        </a-form-item>

        <a-form-item :name="['Announcement', 'File']" label="附件"> 
            <input type="file" id="InputFile1" name="InputFiles">
        </a-form-item>
                
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit" @click="Upload">发布公告</a-button>
        </a-form-item>
        
    </a-form>
</template>


<script setup>
import {reactive } from 'vue';
import axios from 'axios';

import { message } from 'ant-design-vue'; // 显示提示信息

// 获取token
import {useLoginInStore} from '../../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;





const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 20,
},
};





//  表单的数据
const FormState = reactive({
Announcement: {
    Title: '公告标题',
    Content: '',
    Course_id:'',
},
});

const props = defineProps({
    Course_id:{
        type:Number,
        default:null,
        required:true,
    },
  

});

const emit =defineEmits(['EmitResult'])

// 显示信息


function Upload(){
    
    // 注意,这里拿取文件的方式是by ID,同一个页面只能有1个id,之前test页面里最开始已经有一个了,就会出bug
    console.log(document.getElementById('InputFile1').files);

    
    var File = document.getElementById('InputFile1').files[0];

    // console.log('File',File);

    // console.log('File.size:',File.size);

    // var FileSize=File.size/1024/1024;
    // console.log('FileSize',FileSize);

    // if(FileSize>10)
    // {
    //     message.error('文件大小超过10MB,当前文件大小'+FileSize+'MB');
    //     return ;
    // }


    



    var NewFormData = new FormData();

    // 👇针对本组件的方法
    
    NewFormData.append('Title',FormState.Announcement.Title);
    NewFormData.append('Content',FormState.Announcement.Content);
    NewFormData.append('Course_id',props.Course_id);
    NewFormData.append("Files",File);
    // console.log('👇this is formdata');
    // console.log(File);
    // console.log(NewFormData.get("Files"));


    // console.log(NewFormData.get("Title"));
    // console.log(NewFormData.get("Content"));


    







    axios.post('http://123.56.21.208:8002/api/Lesson/NoticeInfoCreateView/',NewFormData,{
                'Content-type' : 'multipart/form-data',
                headers: {Authorization: `Bearer ${token}`},
            }).then(function (response) {
                console.log(response);
                console.log(response.data);
                
                
                emit('EmitResult',true);
                


            })
            .catch(function (error) {
                console.log('error--------------');
                console.log(error);
                alert("Error,上传失败");
                
                emit('EmitResult',false);
            });

};






</script>

