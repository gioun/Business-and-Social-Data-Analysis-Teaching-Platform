<template>
    <a-space direction="vertical">
      <a-input-search
        v-model:value="Id"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="loadXMLDoc"
      >
      </a-input-search>
    </a-space>
</template>


<script>
// import { defineComponent, ref } from 'vue';
  // export default defineComponent({
  //   setup() {
  //     const value = ref('');
  
  //     const onSearch = searchValue => {
  //       console.log('use value', searchValue);
  //       console.log('or use this.value', value.value);
  //     };
  
  //     return {
  //       value,
  //       onSearch,
  //     };
  //   },
  // });
export default{
  emits:['sendJsonString'],
  
  data(){
    return{
      
      JsonString:JSON.stringify({'Name':'默认Json数据','Num':0,'Meaning':'该数据显示说明没有传递数据成功'}),
      JsonObj:{"test1":111,"test2":222},
      Id:"",
      QueryVisiable:true,
      ResultVisiable:false
    }
  },
  props:{
    Api:{type:String,default:"https://tenapi.cn/bilibili/?uid="}
  },

  methods:{
    send2parent:function(){
      console.log("子组件向父组件发送信息:"+this.JsonString);
      this.$emit('sendJsonString',this.JsonString);
    },


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
              _this.send2parent();

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