<!-- 获取一个jsonstring,将jsonstring转化json然后转化为为表格 -->

<template>
    
    <h2>自动布局式表格</h2>
    <div id="Result">
        <table>
            <tr>
                <th v-for="(value,name,index) in this.JsonObj" :key='index'>{{name}}</th>
            </tr>
            <tr>
                <td v-for="(value,index) in this.JsonObj" :key='index'>{{value}}</td>
            </tr>

        </table>
    </div>
    
</template>


<script>
    export default{
        data(){
            return{
                JsonObj:{'Name':'默认Json数据','Num':0,'Meaning':'该数据显示说明没有传递数据成功'},
            }
        },
        props:{
            JsonString:{type:String,default:JSON.stringify({'Name':'默认Json数据','Num':0,'Meaning':'该数据显示说明没有传递数据成功'})},
        },
        watch:{
            JsonString:function(){
                this.JsonObj=JSON.parse(this.JsonString);
                console.log(this.JsonObj);
                
            },
        },
    }

</script>


 <style>
/* table
    {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }
    table td, table th
    {
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }
    table thead th
    {
        background-color: #CCE8EB;
        width: 100px;
    }
    table tr:nth-child(odd)
    {
        background: #fff;
    }
    table tr:nth-child(even)
    {
        background: #F5FAFA;
    } */
    table, td, th {  
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 15px;
}


 </style>