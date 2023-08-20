<!-- 有问题 -->

<script>
    export default{
        data(){
            return{
                Api:"https://tenapi.cn/bilibili/?uid=",
                JsonString:"111111",
                JsonObj:{"test1":111,"test2":222},
                Id:"",
                QueryVisiable:true,
                ResultVisiable:false

            }
        },

        methods:{
            Test(){
                console.log(Object.keys(this.JsonObj));
                console.log(Object.keys(this.JsonObj).length);
            },

            ShowTable(){
                this.QueryVisiable=false;
                this.ResultVisiable=true;
            },
            

            ParseJson(){
                this.JsonObj=JSON.parse(this.JsonString);
                console.log(this.JsonObj);
                this.ShowTable();
 
            },
            loadXMLDoc()
            {
                var xmlhttp;
                var _this = this;//这个很关键,否则直接使用this.JsonString=xxxx会寄
                // 传入UID变量，与API组合成对应的url,
                var uidurl=this.Api+this.Id;
                console.log(uidurl);
                console.log(typeof(uidurl));
                if (window.XMLHttpRequest)
                {
                    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                    xmlhttp=new XMLHttpRequest();
                }
                else
                {
                    // IE6, IE5 浏览器执行代码
                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                        console.log("进入if");
                        console.log(xmlhttp.readyState);
                        console.log(xmlhttp.responseText);
                        console.log(typeof(xmlhttp.responseText));
                        // document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
                        // ParseJson(xmlhttp.responseText);
                        
                        _this.JsonString= xmlhttp.responseText;
                        _this.ParseJson();

                    }
                    else
                    {
                        console.log(xmlhttp.readyState);
                        console.log("---------------");
                        console.log(this.JsonString);
                        console.log("---------------");
                    }
                }
                xmlhttp.open("GET",uidurl,true);
                xmlhttp.send();
            }  
        }
    }
</script>

<template>
    <div id="Quiery"  v-if="QueryVisiable">
        <input type="text" v-model="Id" >
        <button @click="loadXMLDoc" >提交查询</button>
        <!-- <br>
        <button @click="Test;ResultVisiable=!ResultVisiable">测试函数</button> -->
        
    </div>
        
    <div id="Result" v-if="ResultVisiable">
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

<!-- 

{
    {
    "code": 200,
    "data": {
        "uid": "1",
        "name": "bishi",
        "level": 5,
        "sex": "男",
        "description": "",
        "avatar": "http://i0.hdslb.com/bfs/face/34c5b30a990c7ce4a809626d8153fa7895ec7b63.gif"
    }
}
 -->


 <style>
    table
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
        }


 </style>