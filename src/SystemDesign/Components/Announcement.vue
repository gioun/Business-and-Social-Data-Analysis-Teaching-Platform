<template> 
        <a-card :title="AnnouncementData.Title" :bordered="true" style="width: auto" :hoverable=true>

        
        <a-descriptions title="">
            <a-descriptions-item label="课程">{{AnnouncementData.Lesson}}</a-descriptions-item>
            <a-descriptions-item label="发送教师">{{AnnouncementData.Teacher}}</a-descriptions-item>
            <a-descriptions-item label="发布时间">{{AnnouncementData.Time}}</a-descriptions-item>
            <!-- 👇要处理附件为空时的情况 -->
            <a-descriptions-item label="附件"><a :href="AnnouncementData.File" >附件</a></a-descriptions-item>
        </a-descriptions> 
        <a-divider orientation="left">详细信息</a-divider>
        <p>{{AnnouncementData.Content}}</p>
    </a-card>

</template>


<script setup>
import {ref, reactive} from 'vue';

const props = defineProps({
    AnnouncementData:{
        type:Object,
        default:{
            Title:'图文信息标题',
            Lesson:'课程名称',
            Teacher:'教师名称',
            Time:'时间',
            File:'此处为附件链接',
            Content:'公告信息',
        },
        required: false,
    }
});





</script>

<style scoped>

</style>