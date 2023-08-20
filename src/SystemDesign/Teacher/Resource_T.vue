<template>
    <a-layout-content>  
        <a-card
        title="资源访问"
        :headStyle="CardHeadStyle"
        :bodyStyle="BodyStyle"
        :bordered="false"
        >
        <a-descriptions 
        title=""
        bordered
        >
            <a-descriptions-item label="协作代码编辑"  :span="4"><a href="https://lightly.teamcode.com/">Lightly</a></a-descriptions-item>
            <a-descriptions-item label="流程图绘制"   :span="4"><a href="http://47.104.84.236:8001/">DrawIO</a></a-descriptions-item>
            <a-descriptions-item label="Wating for adding"  ><a href="">Wating for adding</a></a-descriptions-item>
            
        </a-descriptions> 


        </a-card>
    </a-layout-content>

</template>


<script setup>
import {ref,reactive} from 'vue';
import { message } from 'ant-design-vue'; // 显示提示信息

// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};

const BodyStyle={minHeight: '400px'};
</script>