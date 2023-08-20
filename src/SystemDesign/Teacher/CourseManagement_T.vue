<template>
    <a-layout>
        <a-layout-sider width="300"  style="background: #fff ; ">   
            <div :style="{ magin:'5px', padding: '5px',}">
                <a-card title="课程列表" 
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >
                    <a-button @click="CreateCourse">创建课程</a-button>
                    <br>
                    <br>
                    <div>
                        <CourseList :Api="CourseListApi" @SelectedItemInfo="MenuItemInfo"></CourseList>
                    </div>
                </a-card>
            </div>
        </a-layout-sider>  

        <a-layout-content >
            <div :style="{ background: '#fff',magin:'5px', padding: '5px',minHeight: '750px'}">
                <a-card
                :tab-list="tabListNoTitle"
                :active-tab-key="noTitleKey"
                @tabChange="key => onTabChange(key, 'noTitleKey')"
                :headStyle="CardHeadStyle"
                :bodyStyle="BodyStyle"
                >


                    <div v-if="noTitleKey === 'article'">
                        <a-empty v-if="CourseDetail.data.course_id==null"/>
                        <a-descriptions 
                        :title="CourseDetail.data.course_name"
                        v-if="CourseDetail.data.course_id!=null"
                        bordered
                        >
                            <a-descriptions-item label="课程名字" :span="2">{{CourseDetail.data.course_name}}</a-descriptions-item>
                            <a-descriptions-item label="课程编号" >{{CourseDetail.data.course_id}}</a-descriptions-item>
                            <a-descriptions-item label="学分">{{CourseDetail.data.course_credit}}</a-descriptions-item>
                            <a-descriptions-item label="学时">{{CourseDetail.data.course_hours}}</a-descriptions-item>
                            <a-descriptions-item label="授课学期">{{CourseDetail.data.course_semester=='1'?'上学期':'下学期'}}</a-descriptions-item>
                        
                        </a-descriptions> 
                        
                        <br>

                        <a-descriptions 
                        title="相关操作"
                        v-if="CourseDetail.data.course_id!=null"
                        bordered
                        >
                            <!-- 查看学生 -->
                            <a-descriptions-item label="查看学生" :span="2"><a-button @click="ShowStudentTable">查看学生</a-button></a-descriptions-item>
                            <!-- 修改信息 -->
                            <a-descriptions-item label="修改信息" :span="2"><a-button @click="ChangeCourse">修改信息</a-button></a-descriptions-item>
                            <!-- 删除课程 -->
                            <a-descriptions-item label="删除课程" :span="2">
                                <a-popconfirm
                                title="删除课程会影响该课程所有授课教师,确定删除该课程?"
                                ok-text="Yes"
                                cancel-text="No"
                                @confirm="DeleteCourse(CourseDetail.data.course_id)"
                                >
                                    <a-button>删除课程</a-button>
                                </a-popconfirm>
                            </a-descriptions-item>

                            <!-- 邀请教师 -->
                            <a-descriptions-item label="邀请教师" :span="4">
                                <a-space direction="horizontal">
                                    <a-input placeholder="请输入教师ID" v-model:value="InvitedTeacherID" ></a-input>
                                    <a-button @click="AxiosPostInviteTeacher">确认</a-button>
                                </a-space>
                            </a-descriptions-item>

                          
                            <!-- 退出课程 -->
                            <a-descriptions-item label="退出课程" :span="2">
                                <a-popconfirm
                                title="确定是否退出课程?"
                                ok-text="Yes"
                                cancel-text="No"
                                @confirm="AxiosGetRemoveCourse"
                                >
                                    <a-button>退出课程</a-button>
                                </a-popconfirm> 
                                
                            </a-descriptions-item>

                            <!-- 查看成绩 -->
                            <a-descriptions-item label="查看成绩" :span="2">
                                <a :href="'http://123.56.21.208:8002/api/Lesson/Score_statistics/'+CourseAbbrInfo.data.Course_id+'/'">获取学生成绩</a>
                            </a-descriptions-item>

                            <!-- 查看小组 -->
                            <a-descriptions-item label="查看小组" :span="2">
                                <a-button @click="AxiosPostGetCourseGroupInfo">查看小组情况</a-button>
                            </a-descriptions-item>
                            
                        </a-descriptions> 

                        
                    </div>


                    <div v-else-if="noTitleKey === 'app'">
                        <div>
                            
                            <a-button @click=" CreateAnnouncement" v-if="CourseDetail.data.course_id">发布公告</a-button>
                            <br>
                            <br>
                            
                            <div>
                                <AnnouncementList :AnnouncementAbbrInfoList="AnnouncementAbbrInfoList.data"></AnnouncementList>
                            </div>
                        </div>

                    </div>

                </a-card>

            </div>

        </a-layout-content>



    </a-layout>

<div>



    <!-- 创建课程弹出框 -->
    
    <a-modal
        
        v-model:visible="CreateCourseVisible"
        title="创建课程"
        width="1000px"
        @ok="HandleOk"
        >

        <!-- 创建课程的表单 -->
        <a-form 
        v-bind="layout"
        >

            <a-form-item :name="['Course', 'Name']" label="课程名" >
                <a-input  placeholder="请输入课程名" v-model:value="NewCourse.data.course_name" />
            </a-form-item>
            <br>
    
            <!-- Selector是自定义的包装好的下拉组件 -->
            <a-form-item :name="['Course', 'Credit']" label="学分" >
                <!-- <Selector :Options="FieldOption" :DefaultValue="FieldQuery" @selected_value="FieldSelected"></Selector> -->
                <Selector :Options="CreditOption" @selected_value="CreditSelected"></Selector>    
            </a-form-item>
            <br>
    
            <a-form-item :name="['Course', 'Hours']" label="学时" > 
                <Selector :Options="HoursOption"  @selected_value="HoursSelected"></Selector>    
            </a-form-item>
            <br>
                    
            <a-form-item :name="['Course', 'Semester']" label="授课学期" >  
                <Selector :Options="SemesterOption"  @selected_value="SemesterSelected"></Selector>    
            </a-form-item>
            <br>
            <!-- <a-form-item :name="['Course', 'Semester']" label="授课时间" :rules="[{ required: true, message: '请输入授课时间' }]">  
                <a-input  placeholder="请输入授课时间" v-model:value="NewCourse.data.course_time" />
            </a-form-item> -->

        </a-form>

        <template #footer>
            <a-button key="back" @click="CancelCreateCourse">取消创建</a-button>
            <a-popconfirm
                title="确定创建该课程?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="SubmitCreateCourse"

            >
                <a-button key="submit" type="primary" :loading="Loading">提交创建</a-button>
            </a-popconfirm>
        </template>
    </a-modal>


    <!-- 修改课程信息,和创建课程信息基本相同逻辑 -->    
    
        
    <a-modal
    v-model:visible="ChangeCourseVisible"
    title="修改课程课程"
    width="1000px"
    @ok="ChangeCourseVisible=false"
    >
        <!-- 创建课程的表单 -->
        <a-form 
        v-bind="layout"
        >
            <a-form-item :name="['Course', 'Name']" label="课程名" >
                <a-input  placeholder="请输入课程名" v-model:value="NewCourse.data.course_name" />
            </a-form-item>
            <br>
            <!-- Selector是自定义的包装好的下拉组件 -->
            <a-form-item :name="['Course', 'Credit']" label="学分" >
                <!-- <Selector :Options="FieldOption" :DefaultValue="FieldQuery" @selected_value="FieldSelected"></Selector> -->
                <Selector :Options="CreditOption" :DefaultValue="NewCourse.data.course_credit"    @selected_value="CreditSelected"></Selector>    
            </a-form-item>
            <br>
            <a-form-item :name="['Course', 'Hours']" label="学时" > 
                <Selector :Options="HoursOption"  :DefaultValue="NewCourse.data.course_hours"    @selected_value="HoursSelected"></Selector>    
            </a-form-item>
            <br>
            <a-form-item :name="['Course', 'Semester']" label="授课学期" >  
                <Selector :Options="SemesterOption" :DefaultValue="NewCourse.data.course_semester"   @selected_value="SemesterSelected"></Selector>    
            </a-form-item>
            <br>
            <!-- <a-form-item :name="['Course', 'Semester']" label="授课时间">  
                <a-input  placeholder="请输入授课时间" v-model:value="NewCourse.data.course_time" />
            </a-form-item> -->
        </a-form>
        <template #footer>
            <a-button key="back" @click="ChangeCourseVisible=false">取消修改</a-button>
            <a-popconfirm
            title="确定修改该信息?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="SubmitChangeCourse"
            >
                <a-button key="submit" type="primary" :loading="Loading">提交修改</a-button>
            </a-popconfirm>
        </template>
    </a-modal> 

    
    <!-- 弹出框用于展示已经建立的课程的学生的信息的表格,并且能够在此新建学生和删除已有学生 -->
    <a-modal
    v-model:visible="Visible"
    title="学生信息"
    width="1000px"
    @ok="HandleOk"
    >
        <input type="file" id="AddStudentFile" />
        <a-button @click="AddStudent" :loading="Loading">导入学生</a-button>


        <a-table
        :dataSource="StudentList.data" 
        :columns="StudentColumns.data"
        >
            <!-- 准备删除 -->
            <template #bodyCell="{text, record, index, column}">
                <template v-if="column.key === 'Delete'">
                    <a-popconfirm
                    v-if="StudentList.data.length"
                    title="确认删除该学生?"
                    @confirm="OnDeleteStudent(record)"
                    >
                        <a >删除学生</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </a-modal>

    <!-- 发布公告,下面的ReleaseAnnouncement是自定义的包装好的发布公告的组件 -->
        
    <a-modal
    v-model:visible="AnnouncementVisible"
    title="发布公告"
    width="1000px"
    @ok="HandleOkRA"
    >
        <div>
            <h2>发布公告</h2>
            <!-- ReleaseAnnouncement是自定义的包装好的发布公告的组件,发布公告用 -->
            <ReleaseAnnouncement :Course_id="CourseDetail.data.course_id" @EmitResult="CreateAnnouncementResult"> </ReleaseAnnouncement>
        </div>

        <!-- 不显示下面的提交的ok选项 -->
        <template #footer>

        </template>
    </a-modal>

    <a-modal
    v-model:visible="CourseGroupInfoVisible"
    title="小组信息"
    width="1000px"
    @ok="CourseGroupInfoVisible=false"
    >   
        <a-card >
            <a-card-grid style="width: 50%;" :hoverable="false" v-for="item in CourseGroupInfo.data">
                <a-card :title="item.Group">
                    <div style="padding:5px">
                        <a-descriptions>
                            <a-descriptions-item label="组长">
                                {{item.Leader}}
                            </a-descriptions-item>
                            <a-descriptions-item label="组员" v-for="member in item.member">
                                {{member}}
                            </a-descriptions-item>
                        </a-descriptions>
                    </div>      
                </a-card>
            </a-card-grid>

        </a-card>


        <template #footer>
        </template>
    </a-modal>

</div>


</template>


<script setup>
// vue组件
import {ref,reactive} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // 显示提示信息
// 登录状态管理Pinia
import {useLoginInStore} from '../Status/Store';
const LoginStore=useLoginInStore();
const token=LoginStore.status.data.Token;
// 自定义外部组件
import CourseList from '../GeneralComponents/CourseList.vue'; // 左侧课程列表
import Selector from '../GeneralComponents/Selector.vue'; // 下拉选择框
import ReleaseAnnouncement from './Components/ReleaseAnnouncement.vue'; // 发布公告组件,与发布公告函数相关的在里面
import AnnouncementList from '../GeneralComponents/AnnouncementList.vue'; // 公告列表组件,显示公告的详细信息

// 时间函数处理
function ReturnStandardTime(TimeString)
{
    var d=new Date(TimeString);
    var datetime =  d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
    return datetime;
}

// 整体外观预设
const CardHeadStyle={background:'#F0F2F5'};
const BodyStyle={minHeight: '700px'};

const tabListNoTitle = [{
    key: 'article',
    tab: '课程信息',
}, 
{
    key: 'app',
    tab: '公告',
}, 
];

const noTitleKey = ref('article');

const onTabChange = (value, type) => {
    console.log(value, type);
    if (type === 'key') {
    key.value = value;
    } else if (type === 'noTitleKey') {
    noTitleKey.value = value;
    }
};




//---------------------------------------------------------------------左侧课程列表


const CourseAbbrInfo=reactive({
    data:'',
});

const CourseListApi=ref('');

// 选中课程后收到返回信息,触发该函数,可以触发不同的结果
// 需要处理成能够发给AxiosPostGetAnnouncementList要用的那部分
// 注意,除了给公告外,还应该给小组,还应该给课程细节
function MenuItemInfo(Info){
    console.log('接收从插槽中返回的数据');
    console.log(Info);

    CourseAbbrInfo.data=Info;

  
    AxiosPostGetAnnouncementList(Info.Course_id);

    // AxiosPostGetGroupStatus(Info.api2)

    // 从特定的API中获取课程详细信息
    AxiosGetCourseDetail('http://123.56.21.208:8002/api/Lesson/CourseInfo/'+Info.Course_id+'/');
};


//---------------------------------------------------------------------课程详细信息
// 课程详细信息
const CourseDetail=reactive({
    data:{
        course_id: null, 
        course_name: null, 
        course_credit: null, 
        course_hours: null, 
        course_semester: null, 
        course_time: null, 
        teacher: null,
    }
    
})
// 获取课程详细信息
function AxiosGetCourseDetail(API){
    axios.get(API)
            .then(function (response) {
                // console.log('课程详细信息👇');
                // console.log(response);
                // console.log(response.data);
                CourseDetail.data=response.data;
                console.log('CourseDetail.data:',CourseDetail.data);


            })
            .catch(function (error) {
                    // console.log('error--------------');
                    // console.log(error);
                    alert("Error,联系管理员解决问题");
            });


}
// 删除课程
function DeleteCourse(CourseID)
{
    console.log('删除课程');
    console.log(CourseID);

    const DeleteCourseAPI='http://123.56.21.208:8002/api/Lesson/CourseInfo/'+CourseID+'/';

    const Config={
        method:'delete',
        url:DeleteCourseAPI,
        headers:{Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        message.success('删除课程成功')
    })
    .catch((error)=>{
        console.log(error);
        alert('删除失败,请检查网络连接或联系管理员');
    })
}

// 退出课程
function AxiosGetRemoveCourse()
{
    var TeacherCourseKey=null;
    console.log()
    for(const i in CourseDetail.data.teacher)
    {
        
        if(Object.keys(CourseDetail.data.teacher[i])[0]==LoginStore.status.data.Name)
        {
            TeacherCourseKey=Object.values(CourseDetail.data.teacher[i])[0];
        }
    }

    const Config={
        method:'delete',
        url:'http://123.56.21.208:8002/api/Lesson/CourseTeacherInfo/'+TeacherCourseKey+'/',
        headers: {Authorization: `Bearer ${token}`}
    }

    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        message.success('退出课程成功');
    })
    .catch((error)=>{
        console.log(error);
        alert('error');
    })

}


// 邀请教师
const InvitedTeacherID=ref('');

function AxiosPostInviteTeacher()
{
    const Config={
        method:'post',
        data:{
            Course_id:CourseDetail.data.course_id,
            Teacher_id:InvitedTeacherID.value,
        },
        url:'http://123.56.21.208:8002/api/Lesson/CourseTeacherInfo/',
        headers: {Authorization: `Bearer ${token}`}
    }

    console.log(Config);

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        message.success('邀请成功');
        InvitedTeacherID.value=null;
    })
    .catch((error)=>{
        console.log(error);
        alert('无法邀请教师,请检查相关信息或联系管理员');
    })
}



//---------------------------------------------------------------------查看选课学生信息
// 👇查看选课学生信息

const Visible=ref(false);


// 面板
function  HandleOk()
{
    Visible.value = false;
}

// 从后台获取的学生信息
const  StudentList=reactive({
    data:[
        {
            
            id:'',
            
            name:'',
            college:'',
            grade:'',
            c_class:'',
            phone:'',
            email:'',
        },

    ]
})

const StudentColumns=reactive({
    data:[
        {
            
            title:'学生姓名',
            dataIndex:'name',
            key:'name',
        },
        {
            title:'学院',
            dataIndex:'college',
            key:'college',
        },
        {
            title:'年级',
            dataIndex:'grade',
            key:'grade',
        },
        {
            title:'班级',
            dataIndex:'c_class',
            key:'c_class',
        },
        {
            title:'电话',
            dataIndex:'phone',
            key:'phone',
        },  
        {
            title:'邮箱',
            dataIndex:'email',
            key:'email'
        },
        {
            title:'删除',
            dataIndex:'Delete',
            key:'Delete',
        }
        
    ]
});

// 获取课程的学生信息
function ShowStudentTable(){

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/CourseStudentView/',
        data:{"Course_id":CourseDetail.data.course_id},
        headers:{Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        message.success('查看学生成功');
        StudentList.data=response.data;
        for(let i =0;i<StudentList.data.length;i++)
        {
            StudentList.data[i].key=i;
        }

    })
    .catch((error)=>{
        console.log(error);
        alert('查看学生失败,请检查网络连接或联系管理员');
    })
    Visible.value=true;
}

// 👇删除学生,需要向后台提交删除命令
function OnDeleteStudent(record)
{

    console.log(record);
    var key=record.key;
    


    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/CourseStudnetDel/',
        data:{
            Course_id:CourseAbbrInfo.data.Course_id,
            Student_id:record.id,
        },
        headers:{Authorization: `Bearer ${token}`},
    }
    axios.request(Config)
    .then((response)=>{
        if(response.data.message=='删除成功')
        {
            message.success('删除成功');
            StudentList.data = StudentList.data.filter(item => item.key !== key);
        }
    })
    .catch((error)=>{
        alert('删除失败,请检查网络或联系管理员');
    })

}




// -----------------------------------加入学生,暂定只使用上传文件的形式

function AddStudent()
{
    Loading.value=true;
    var File = document.getElementById('AddStudentFile').files[0];
    var NewFormData = new FormData();

    NewFormData.append('Course_id',CourseDetail.data.course_id);
    NewFormData.append('Student_excel',File);


    axios.post('http://123.56.21.208:8002/api/Users/student/',NewFormData,{
                'Content-type' : 'multipart/form-data',
                headers: {Authorization: `Bearer ${token}`},
            }).then(function (response) {
                console.log(response);
                console.log(response.data);
                
                message.success('添加成功');
                
                setTimeout(() => {

                ShowStudentTable();
                Loading.value=false;

                }, 5000);

                


            })
            .catch(function (error) {
                console.log('error--------------');
                console.log(error);
                alert("Error,上传失败,请检查文件格式或联系管理员");
            
            });

    setTimeout(() => {
    Loading.value=false;
      }, 1000);

}


//---------------------------------------------------------------------创建新课程(已完成)
// 创建课程
//  创建课程表单的数据
const NewCourse=reactive({
    data:{
        course_name: null,
        course_credit: null, 
        course_hours: null, 
        course_semester: null,
        // course_time: null,
        }
})

const  CreditOption=[
    {value:1,label:"一学分"},
    {value:2,label:"二学分"},
    {value:3,label:"三学分"},
    {value:4,label:"四学分"},
    {value:5,label:"五学分"},
];

function CreditSelected(CreditFromChildSelector){
    console.log("from child:",CreditFromChildSelector);
    NewCourse.data.course_credit=CreditFromChildSelector;
    console.log('NewCourse.data.course_credit:',NewCourse.data.course_credit);
}

const SemesterOption=[
    {value:1,label:"2022年-2023年秋季学期"},
    {value:2,label:"2022年-2023年春季学期"},
    {value:3,label:"2023年-2024年秋季学期"},
    {value:4,label:"2023年-2024年春季学期"},
];

function SemesterSelected(SemesterFromChildSelector){
    console.log("from child:",SemesterFromChildSelector);
    NewCourse.data.course_semester=SemesterFromChildSelector;
    console.log('NewCourse.data.course_semester:',NewCourse.data.course_semester);
}

const HoursOption=[
    {value:1,label:"每周一学时"},
    {value:2,label:"每周二学时"},
    {value:3,label:"每周三学时"},
    {value:4,label:"每周四学时"},
    {value:5,label:"每周五学时"},
];

function HoursSelected(HoursFromChildSelector){
    console.log("from child:",HoursFromChildSelector);
    NewCourse.data.course_hours=HoursFromChildSelector;
    console.log('NewCourse.data.course_hours:',NewCourse.data.course_hours);
}

const CreateCourseVisible=ref(false);

function CreateCourse()
{
    CreateCourseVisible.value=true;
    NewCourse.data={
        course_name: null,
        course_credit: null, 
        course_hours: null, 
        course_semester: null,
        // course_time: null,
        };

}

// 创建课程表单的layout
const layout = {
labelCol: {
    span: 4,//前面的空间
},
wrapperCol: {
    span: 8,
},
};

// 加载中
const Loading=ref(false);

// 取消创建课程
function CancelCreateCourse()
{
    // 清空
    NewCourse.data={
        course_name: null,
        course_credit: null, 
        course_hours: null, 
        course_semester: null,
    }
    CreateCourseVisible.value=false;

}

// 向后台提交上传创建课程
function SubmitCreateCourse()
{
    console.log('创建课程');
    Loading.value=true;
    for(const i in NewCourse.data)
    {
        if(NewCourse.data[i]==null)
        {
            message.error("请检查信息是否补充完整");
            Loading.value=false;
            return ;
        }
    }


    // 👇当axios成功创建后才关闭
    // 
    // 创建课程需要附加token
    // API:http://123.56.21.208:8002/api/Lesson/CourseTeacherInfo/
    const CreateCourseAPI='http://123.56.21.208:8002/api/Lesson/CourseCreateInfo/';
    // console.log(CreateCourseAPI);
    // console.log(NewCourse.data);
    // console.log({headers: {Authorization: `Bearer ${token}`}});

    axios.post(CreateCourseAPI,NewCourse.data,{headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {

    // 👇获取response.data
    
        console.log(response.data);
        message.success("创建成功,刷新显示课程");
        CreateCourseVisible.value=false;
    })
    .catch(function (error) {

        alert("Error,无法创建课程,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
    

    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);

    
}


//---------------------------------------------------------------------修改课程信息

const ChangeCourseVisible=ref(false);


function ChangeCourse(){
    ChangeCourseVisible.value=true;
    NewCourse.data=CourseDetail.data;
}

function SubmitChangeCourse()
{
    console.log('修改课程');
    Loading.value=true;

    for(const i in NewCourse.data)
    {
        if(NewCourse.data[i]==null&&i!='course_time')
        {
            console.log(NewCourse.data);
            console.log(i,NewCourse.data[i])
            message.error("请检查信息是否补充完整");
            Loading.value=false;
            return ;
        }
    }

    const ChangeCourseAPI='http://123.56.21.208:8002/api/Lesson/CourseInfo/'+NewCourse.data.course_id+'/';


    axios.put(ChangeCourseAPI,NewCourse.data,{headers: {Authorization: `Bearer ${token}`}})
    .then(function (response) {

    // 👇获取response.data
        console.log(response.data);
        message.success("修改成功");
        ChangeCourseVisible.value=false;
    })
    .catch(function (error) {

        alert("Error,无法修改课程信息,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
    

    // 无论成功与否,axios后loading为false
    setTimeout(() => {
        Loading.value=false;
      }, 1000);

}


//---------------------------------------------------------------------查看小组信息
const CourseGroupInfoVisible=ref(false);

const CourseGroupInfo=reactive({
    data:[
        {
            Leader:'组长1',
            Group:'小组1',
            member:[
            '组员1','组员2','组员3'
            ],
        },
        {
            Leader:'组长2',
            Group:'小组2',
            member:[
            '组员1','组员2','组员3'
            ],
        }
    ]
})

function AxiosPostGetCourseGroupInfo()
{

    CourseGroupInfoVisible.value=true;

    const Config={
        method:'post',
        url:'http://123.56.21.208:8002/api/Lesson/GroupInfolistTeacher/',
        data:{
            Course_id:CourseAbbrInfo.data.Course_id,
        },
        headers: {Authorization: `Bearer ${token}`},
    }

    axios.request(Config)
    .then((response)=>{
        console.log(response.data);
        CourseGroupInfo.data=response.data;

    })
    .catch((error)=>{
        console.log(error);
        alert('错误,请检查网络或联系管理员');
    })

}


//---------------------------------------------------------------------当前公告
// 👇发布公告
// 👇下面的需要向后端获取数据
// 点击对应课程的信息栏,向对应API获取公告信息,更新AnnouncementList,从而触发页面公告更新
// 其实也可以把公告信息放在下面,反正都是文字,数据量应该不是很大

function AxiosPostGetAnnouncementList(CourseID)
{
    const GetAnnouncementIDListAPI='http://123.56.21.208:8002/api/Lesson/NoticeIDListView/';
    axios.post(GetAnnouncementIDListAPI,
    {"Course_id":CourseID},
    {headers: {Authorization: `Bearer ${token}`}},
    )
    .then(function (response) {

        // 👇获取AnnouncementAbbrInfoList.data
        // AnnouncementAbbrInfoList.data=response.data;
        console.log('👇课程公告列表ID:');
        console.log(response.data);
        AnnouncementAbbrInfoList.data=response.data;

    })
    .catch(function (error) {
        alert("Error,无法获取公告列表,请检查网络或联系管理员");
    })
    .then(function () {
    }); 
}

// 👇缩略信息,需要根据api进行修改,初始状态下为空
const AnnouncementAbbrInfoList=reactive({
    data:[],
})


//---------------------------------------------------------------------发布公告

// 👇显示当前课程公告
// 👇需要从后端调取公告数据


const AnnouncementActiveKey = ref(['']);

const AnnouncementVisible=ref(false);

function CreateAnnouncementResult(Result)
{
    if(Result===true)
    {
        AnnouncementVisible.value=false;
        message.success('成功上传');
        AxiosPostGetAnnouncementList(CourseAbbrInfo.data.Course_id);

    }
    else
    {
        message.error('上传失败');
    }

}

function CreateAnnouncement()
{
    AnnouncementVisible.value=true;
}

function HandleOkRA()
{
    AnnouncementVisible.value=false;
}






</script>

<style scoped>

</style>