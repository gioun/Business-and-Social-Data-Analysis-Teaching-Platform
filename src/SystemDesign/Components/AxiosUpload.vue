<template>
    <div>
        <a-divider />
        <input type="file" id="InputFile" name="InputFiles">
        <a-button @click="Upload">上传文件</a-button>
        <a-divider />
    </div>
</template>


<script setup>
import axios from 'axios';
import {ref,reactive} from 'vue';






function Upload(){
    // let File = document.getElementsByName('InputFiles')[0].files[0];
    let File = document.getElementById('InputFile').files[0];
    let NewFormData = new FormData();
    NewFormData.append('id','111');
    NewFormData.append("files",File);
    console.log('👇this is formdata');
    console.log(NewFormData.get("files"));


    // 一个可能可以用的API https://www.mocky.io/v2/5cc8019d300000980a055e76
    // http://123.56.21.208:8002/api/Lesson_file/files/
    axios.post('http://123.56.21.208:8002/api/Lesson_file/files/',NewFormData,{
                'Content-type' : 'multipart/form-data'
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                    console.log('error--------------');
                    console.log(error);
                    alert("Error,联系管理员解决问题");
            });

};






</script>