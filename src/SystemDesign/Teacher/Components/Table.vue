<!-- a-table样式是自动的,固定是10页 -->
<!-- 直接针对教师用到的作业和测试打分进行表格定制设计,使得表格只在该项目使用 -->
<!-- 该组件迁移至教师的文件夹中 -->

<template>
    <div>

        <!-- 测试 -->
        <a-table 
        :dataSource="TestDataSource.data" 
        :columns="TestColumns.data"
        v-if="props.Type=='Test'"
        >  
            <template #bodyCell="{text, record, index, column}">
                <!-- 设置特殊列的内容 -->
                <!-- 下载附件列为a标签 -->
                <template v-if="column.key === 'FilesLink'">
                    <a :href="record.FilesLink">
                      {{ record.FilesLink }}
                    </a>
                </template>

                <template v-else-if="column.key === 'Score'">
                    <a-input type="number" v-model:value="record.Score" size="small" placeholder="等待赋成绩"></a-input>     
                </template>


                <template v-else-if="column.key === 'Action'">
                    <a-button @click="UpdateTestScore(record)" :disabled="!record.Score">提交</a-button>
                </template>

                
            </template>
        </a-table>



        <a-switch 
        v-model:checked="IfGroupScore" 
        checked-children="小组整体打分开启" 
        un-checked-children="小组整体打分关闭" 
        v-if="HomeworkDataSource.HomeworkType=='true' || HomeworkDataSource.HomeworkType==true" 
        @change="SwitchGroupScore" />

        

        

        <a-table 
        :dataSource="HomeworkDataSource.data.filter(Filter2)" 
        :columns="HomeworkColumns.data"
        v-if="props.Type=='Homework'"
        >
            
            <template #bodyCell="{text, record, index, column}">
                <!-- 设置特殊列的内容 -->
                <!-- 下载附件列为a标签 -->
                <template v-if="column.key === 'FilesLink'">
                    <a :href="record.FilesLink">
                      {{ record.FilesLink }}
                    </a>
                </template>

                <template v-else-if="column.key === 'Score'">
                    <a-input type="number" v-model:value="record.Score" size="small" placeholder="等待赋成绩"></a-input>     
                </template>


                <template v-else-if="column.key === 'Action'">
                    <a-button @click="UpdateHomeworkScore(record)" :disabled="!record.Score">提交</a-button>
                </template>

            </template>
        </a-table>

        <a-button @click="AxiosPostDownloadAllFile">下载全部附件</a-button>

    </div>
</template>

<script setup>
import {ref,reactive,} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // 显示提示信息

import {useLoginInStore} from '../../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;

const props=defineProps({
    HomeworkTestID:{
        type:[String,Number],
        default:null,
        require:true,
    },
    CourseID:{
        type:[String,Number],
        default:null,
        require:true,
    },
    Type:
    {
        type:String,
        default:null,
        require:true,
    },

    HomeworkIsGroup:{
        type:[String,Boolean],
        default:null,
        require:false,
    },


});

// 获取不同的详细信息
function GoAxiosPostHomeworkOrTestSubmitInfo()
{   
    if(props.Type=='Homework')
    {
        AxiosPostGetHomeworkSubmitInfo();
    }
    else if(props.Type=='Test')
    {
        AxiosPostGetTestSubmitInfo();
    }
}

GoAxiosPostHomeworkOrTestSubmitInfo();


// 👇针对不同功能的数据
// 还是需要组件化开发,只是该组件针对于教师罢了,需要修改名字
// 小组作业希望后端传递数据时将一个组的数据放在一起
// 👇暂定小组赋分的逻辑:前端获取后端的发送的所有的数据,前端进行简单整理,整理成单组的数据后渲染,赋分后直接返回对应的单组数据,由后端处理(
// 这个table还是作为组件被网页引用,网页向组件传递值,组件处理成两类数据后,根据开关情况处理成不同的值

// !!!!!!👉非常重要,必须指定每条数据的KEY

//---------------------------------------------------------------------获取作业提交列表信息



// 需要展示的数据
// 通过Origin将数据记录下来,作为原始数据保留,通过HomeworkDataSource进行表格数据实际展示
const HomeworkDataSource=reactive({
    HomeworkID:props.HomeworkTestID,
    HomeworkType:props.HomeworkIsGroup,
    IsGroupScore:false,
    data:[
            {
                key:'0',
                StudentID:'1',
                Student_name:'张三',
                group_id:'1',
                group:'第一组',
                FilesLink:'https://www.bilibili.com/',// 一串API
                Score:null,
            },
            
    ]
});

const HomeworkColumns=reactive({
    data:[
        {
            title:'学生姓名',
            dataIndex:'Student_name',
            key:'Student_name',
        },
        {
            title:'小组名称',
            dataIndex:'group',
            key:'group',
        },
        {
            title:'作业附件',
            dataIndex:'FilesLink',
            key:'FilesLink',
        },
        {
            title:'得分',
            dataIndex:'Score',
            key:'Score',
        },  
        {
            title:'操作',
            dataIndex:'Action',
            key:'Action'
        },
        
    ]
});

// 原始数据
const OriginHomeworkDataSource=reactive({
    HomeworkID:props.HomeworkTestID,
    HomeworkType:props.HomeworkIsGroup,
    IsGroupScore:false,
    data:[
            {
                key:'0',
                StudentID:'1',
                Student_name:'张三',
                group_id:'1',
                group:'第一组',
                FilesLink:'https://www.bilibili.com/',// 一串API
                Score:null,
            },
    ]
});


function AxiosPostGetHomeworkSubmitInfo()
{

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/HomeworkSubmitInfoList/',
        data:{Homework_id:props.HomeworkTestID},
        headers:{Authorization: `Bearer ${token}`},
    }
    axios.request(Config)
    .then((response)=>{
        console.log(response.data);

        // 没有key在里面
        // 用于存储的数据
        OriginHomeworkDataSource.data=response.data;
        var count=0;
        for(const i in OriginHomeworkDataSource.data)
        {
            OriginHomeworkDataSource.data[i].key=count;
            count++;
        }


        // 用于实际展示的数据
        HomeworkDataSource.data=OriginHomeworkDataSource.data;
        
    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取作业提交信息,请检查网络或联系管理员');
    })
}



//---------------------------------------------------------------------获取测试提交列表信息
const TestDataSource=reactive({
    TestID:props.HomeworkTestID,
    data:[
            {
                key:'0',
                Student_id:'1',
                Student_name:'张三',
                FilesLink:'https://www.bilibili.com/',// 一串API
                Score:null,
            },
            
    ]
});

const TestColumns=reactive({
    data:[
        {
            title:'学生姓名',
            dataIndex:'Student_name',
            key:'Student_name',
        },
        {
            title:'作业附件',
            dataIndex:'FilesLink',
            key:'FilesLink',
        },
        {
            title:'得分',
            dataIndex:'Score',
            key:'Score',
        },  
        {
            title:'操作',
            dataIndex:'Action',
            key:'Action'
        },
        
    ]
});

function AxiosPostGetTestSubmitInfo()
{

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/TestSubmitInfoList/',
        data:{Test_id:props.HomeworkTestID},
        headers:{Authorization: `Bearer ${token}`},
    }
    axios.request(Config)
    .then((response)=>{
        console.log("测试提交信息");
        console.log(response.data);

        // 没有key在里面
        // 用于存储的数据
        TestDataSource.data=response.data;
        var count=0;
        for(const i in TestDataSource.data)
        {
            TestDataSource.data[i].key=count;
            count++;
        }

    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取作业提交信息,请检查网络或联系管理员');
    })
}













//---------------------------------------------------------------------小组作业显示

// // 👇如果是小组作业,处理成小组的数据
// 没用的
// const GroupHomeworkDataSource=reactive({
//     HomeworkID:'1',
//     HomeworkType:'Group',
//     data:[

//     ]
// })


// // 👇将小组作业数据处理成只含一条记录的数据
// function ToGroupHomeworkDataSource(DataSource)
// {   
//     console.log(DataSource);
//     console.log(DataSource.HomeworkID);
//     console.log(DataSource.HomeworkType);
//     if(!(DataSource.HomeworkType==='Group'))
//     {
//         return ;
//     }
//     let TempList=[];

//     GroupHomeworkDataSource.HomeworkID=DataSource.HomeworkID;
//     GroupHomeworkDataSource.HomeworkType=DataSource.HomeworkType;
//     for(var i=0;i<DataSource.data.length;i++)
//     {
//         if(TempList.indexOf(DataSource.data[i].GroupID)=== -1 )
//         {
//             TempList.push(DataSource.data[i].GroupID);
//             GroupHomeworkDataSource.data.push(DataSource.data[i]);
//         }
//     }
//     console.log(GroupHomeworkDataSource.data);
// }
// ToGroupHomeworkDataSource(OriginHomeworkDataSource);

// 👇必须是变量而不是ref,我他妈不理解为什么操

var GroupIDList=[];

// 👇用于调用filter时使用

function IfGroupNotInList(item)
{
    Count.value++;
    console.log('第',Count.value,'次','触发IfGroupNotInList');
    if(GroupIDList.data.indexOf(item.GroupID)=== -1 )
    {
        console.log('该组不在列表里面',item.GroupID);
        GroupIDList.data.push(item.GroupID);
        console.log(GroupIDList.data);
        return true;
    }
    else
    {
        console.log('该组在里面',item.GroupID);
        return false;
    }    
};

// filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素,如果保留时应该保留的是原来的元素
function Filter()
{
    //  
    // HomeworkDataSource.data.filter((item,index) => (HomeworkDataSource.IsGroupScore?  IfGroupNotInList(item):true) )
    if(!HomeworkDataSource.IsGroupScore)
    {
        return HomeworkDataSource.data;
    }
    else
    {
        var FilteredGroupList=[];
        var FilteredDataSource=[];
        for(var i=0;i<HomeworkDataSource.data.length;i++)
        {
            let item=HomeworkDataSource.data[i];
            if(FilteredGroupList.indexOf(item.GroupID)=== -1 )
            {
                console.log('该组不在列表里面',item.GroupID);
                FilteredGroupList.push(item.GroupID);
                console.log(FilteredGroupList.data);
                FilteredDataSource.push(item);
                
            }
            else
            {
                console.log('该组在里面',item.GroupID);
                
            }  
        }
        return FilteredDataSource;
    }

};

function Filter2(item,index,self)
{
    if(!HomeworkDataSource.IsGroupScore)
    {
        console.log('直接返回真')
        return true;
    }
    else
    {
        if(GroupIDList.indexOf(item.group_id)=== -1 )
        {
            console.log('该组不在列表里面-------------------------------',item.group_id);
            GroupIDList.push(item.group_id);
            console.log(item);
            console.log('-----------------------------------End');
            return true;
            
        }
        else{
            console.log('在列表里面----------');
            console.log(item);
            console.log('---------------------------END');
            return false;
        }
    }

};



// --------------------------------------------------------------------下载全部附件

function AxiosPostDownloadAllFile()
{


    const Config={
        method:'post',
        url:props.Type=='Homework'?'http://123.56.21.208:8002/api/Lesson/HomeworkSubmitAll/':'http://123.56.21.208:8002/api/Lesson/TestSubmitAll/',
        data:props.Type=='Homework'?{Homework_id:HomeworkDataSource.HomeworkID}:{Test_id:TestDataSource.TestID},
        headers:{Authorization: `Bearer ${token}`},
    }

    var DownloadAPIList=[];
    

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        DownloadAPIList=response.data;


        DownloadAPIList.forEach(API => {
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";  // 防止影响页面
            iframe.style.height = 0;  // 防止影响页面
            iframe.src = API; 
            document.body.appendChild(iframe);  // 这一行必须，iframe挂在到dom树上才会发请求
            setTimeout(()=>{
            iframe.remove();
            }, 5 * 60 * 1000);
        });

    })
    .catch((error)=>{
        console.log(error);
        alert('无法获取下载链接,请检查网络或联系管理员');
    })
}

//---------------------------------------------------------------------作业打分

// 👇开关小组作业打分
// 不行,必须在原数据层面处理小组的问题
// 否则在处理了一个组的成绩后又关闭了,就会出现问题,操作的变成了两个数据对象
const IfGroupScore=ref(false);
function SwitchGroupScore()
{
    console.log('开关变化')
    console.log(IfGroupScore.value);
    
    HomeworkDataSource.IsGroupScore=IfGroupScore.value;
    GroupIDList=[];

    // if(!IfGroupScore.value)
    // {
    //     console.log('关闭小组打分');
    //     console.log(OriginHomeworkDataSource);
    //     HomeworkDataSource.HomeworkID=OriginHomeworkDataSource.HomeworkID;
    //     HomeworkDataSource.HomeworkType=OriginHomeworkDataSource.HomeworkType;
    //     HomeworkDataSource.data=OriginHomeworkDataSource.data;
        
    // 如果是按照组赋分
        
    // }else{
    //     console.log('开启小组打分');
    //     console.log(GroupHomeworkDataSource);
    //     HomeworkDataSource.HomeworkID=GroupHomeworkDataSource.HomeworkID;
    //     HomeworkDataSource.HomeworkType=GroupHomeworkDataSource.HomeworkType;
    //     HomeworkDataSource.data=GroupHomeworkDataSource.data;
    // }



}


// 不确定里面关于小组的部分那个移除的是怎么处理的,先自己写一个在下面
function UpdateHomeworkScore(HomeworkRecord){
    console.log(HomeworkRecord.group_id);

    

    if(!HomeworkRecord.Score||HomeworkRecord.Score<0)
    {
        alert('成绩错误,无法提交');
        return;
    }
    // 似乎得通过DataSource进行处理,因为表中的数据不够

    

    AxiosPostSubmitHomeworkScore(HomeworkRecord);


    
    
    
}

function AxiosPostSubmitHomeworkScore(HomeworkRecord)
{

    const IndividualHomeworkScoreAPI='http://123.56.21.208:8002/api/Lesson/HomeworkGradingForIndividual/';
    const GroupHomeworkScoreAPI='http://123.56.21.208:8002/api/Lesson/HomeworkGradingForGroup/';




    // 个人作业打分
    const IndividualDataForm={
    "Student_id":HomeworkRecord.Student_id,
    "Homework_id":HomeworkDataSource.HomeworkID,
    "Score":HomeworkRecord.Score,
    };


    // 小组作业打分
    var GroupDataForm={
    "method":HomeworkDataSource.IsGroupScore==true||HomeworkDataSource.IsGroupScore=='true'?"整体打分":"个体打分",
    "Homework_id":HomeworkDataSource.HomeworkID,
    "Score":HomeworkRecord.Score,
    }

    if(HomeworkDataSource.IsGroupScore==true||HomeworkDataSource.IsGroupScore=='true')
    {
        GroupDataForm.Group_id=HomeworkRecord.group_id;

    }
    else{
        GroupDataForm.Student_id=HomeworkRecord.Student_id;
    }

    

    var Config={
        method:'post',
        url:null,
        data:null,
        headers:{Authorization: `Bearer ${token}`},
    }

    if(props.HomeworkIsGroup=='true'||props.HomeworkIsGroup==true)
    {
        Config.url='http://123.56.21.208:8002/api/Lesson/HomeworkGradingForGroup/';
        Config.data=GroupDataForm;
    }
    else
    {
        Config.url='http://123.56.21.208:8002/api/Lesson/HomeworkGradingForIndividual/';
        Config.data=GroupDataForm;
    }


    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        if(response.data.message=='打分成功')
        {
            message.success('打分成功');

                // 提交时从表格移除,应当注意是否是小组
                if(HomeworkDataSource.IsGroupScore)
                {
                    GroupIDList=[];
                    HomeworkDataSource.data = HomeworkDataSource.data.filter(item => (item.key !== HomeworkRecord.key&&item.GroupID!==HomeworkRecord.GroupID));
                }
                else
                {
                    HomeworkDataSource.data = HomeworkDataSource.data.filter(item => item.key !== HomeworkRecord.key);
                }
        }
        else
        {
            message.error(response.data);
        }
    })
    .catch((error)=>{
        console.log(error);
        alert('无法打分,请检查网络或联系管理员');
    })
}




//---------------------------------------------------------------------测试打分
function  UpdateTestScore(TestRecord)
{

    if(!TestRecord.Score||TestRecord.Score<0)
    {
        alert('成绩错误,无法提交');
        return;
    }

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/TestGrading/',
        data:{
            Student_id:TestRecord.Student_id,
            Test_id:TestDataSource.TestID,
            Score:TestRecord.Score,
        },
        headers:{Authorization: `Bearer ${token}`},
    }
    console.log(Config);
    // TestDataSource.data = TestDataSource.data.filter(item => item.key !== TestRecord.key);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        message.success('打分成功');
        TestDataSource.data = TestDataSource.data.filter(item => item.key !== TestRecord.key);

    })
    .catch((error)=>{
        console.log(error);
        alert('无法打分,请检查网络或联系管理员');
    })

}




</script>

