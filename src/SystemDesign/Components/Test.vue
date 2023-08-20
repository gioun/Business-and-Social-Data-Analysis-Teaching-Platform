<template>
    <div class='test' style="background: #ececec; padding: 30px">
        <a-card title="Card title" :bordered="false" style="width: 25%" :hoverable=true>
            <div>
                <Download></Download>
            </div>
        </a-card>

      </div>

      <div class='test'>
        <a-card title="AxiosUpload成功">
            <AxiosUpload></AxiosUpload>
        </a-card>
      </div>

      

      <a-divider>分割线👇公告</a-divider> 
      <div class='test'>
        <a-button @click="GetAPIReturnValue"> 强制触发GetAPIReturnValue</a-button>
        <CollapseSlot>
          <a-collapse-panel v-for="(item,index) in AnnouncementList.data" :key="index" :header="item.Title">
            <Announcement :AnnouncementData="item"></Announcement>
          </a-collapse-panel>
        </CollapseSlot>
      </div>  

      <br>
      <br>
      <a-divider/>
      <div class='test'>
        <h2>发布公告</h2>
        <ReleaseAnnouncement @APIReturnValue="GetAPIReturnValue"></ReleaseAnnouncement>
      </div>

      <div class='test a-menu'>
        <h2>导航栏插槽</h2>
        <MenuSlot>
          <a-menu-item v-for="(item,index) in AnnouncementList.data" :key="index">
            {{item}}
          </a-menu-item>
        </MenuSlot>

        <a-divider/>

        <h2>导航栏</h2>
        <Menu></Menu>
        
      </div>

</template>



<script setup>
import {ref,reactive} from 'vue';

import Download from './Download.vue';
import Announcement  from './Announcement.vue';
import AxiosUpload from './AxiosUpload.vue';
import Collapse from './Collapse.vue';
import CollapseSlot from './CollapseSlot.vue';
import ReleaseAnnouncement from './ReleaseAnnouncement.vue';

import Menu from './A-Menu.vue';
import MenuSlot from './A-MenuSlot.vue';



// 👇需要从后端调取数据
const AnnouncementList=reactive({
  data:[{
        Title:'图文信息标题1',
        Lesson:'课程名称1',
        Teacher:'教师名称',
        Time:'时间',
        File:'此处为附件链接',
        Content:'公告信息',
    },
    {
        Title:'图文信息标题2',
        Lesson:'课程名称2',
        Teacher:'教师名称2',
        Time:'时间2',
        File:'此处为附件链接2',
        Content:'公告信息2',
    },],
}
)


// 👇以下来自测试展示

function GetAPIReturnValue(APIValue){
  console.log('触发GetAPIReturnValue');
  console.log(APIValue);
  AnnouncementList.data.push(APIValue);
  
};


</script>


<style scoped>
div.test{
border:5px solid grey;
}
</style>