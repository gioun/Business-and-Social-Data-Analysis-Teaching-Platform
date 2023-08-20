
<template>
    
</template>


<script>    
import axios from 'axios';
export default{
    //axios:基于promise的http库
    created(){
        axios.get("https://tenapi.cn/acg").then(function (response) {console.log(response);})
    }
  
    
}
</script>