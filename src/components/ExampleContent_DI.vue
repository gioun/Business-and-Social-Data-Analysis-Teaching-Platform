<template>
<h1>Grid Layout</h1>

<p>This grid layout contains six columns and three rows:</p>
<button @click="testfunction"></button>

<div class="grid-container">
    <div class="item1" id="techname">{{tech_name}}</div>
    <div class="item2" style=" text-align: center  ">{{tech_id}}</div>
    <div class="item3" style=" text-align: center  " >{{tech_field}}</div>  
    <div class="item4" style=" text-align: center  " >{{tech_year}}</div>
    <div class="item5">{{tech_details}}</div>
    <div class="item6">{{tech_vendors}}</div>
</div>    

</template>



<script> 
    //import {testfunction} from './js/test.js';
    
    export default{
        
        data(){
            return{
                tech_name:'tech_name',
                tech_id:'tech_id',
                tech_field:'tech_field',
                tech_year:'tech_year',
                tech_details:'tech_details',
                tech_vendors:'tech_vendors',
            }
        },
        mounted() {
            console.log('1111111');
           
        },
        methods:{
            testfunction:function(){
                document.getElementById("techname").innerHTML='测试成功';
            }
        },

    }


</script>








<style>
.item1 { grid-area: name; }
.item2 { grid-area: tech_id; }
.item3 { grid-area: tech_field; }
.item4 { grid-area: tech_year; }
.item5 { grid-area: tech_details; }
.item6 { grid-area: tech_vendors; }

.grid-container {
    display: grid;
    grid-template-areas:
    'name name name name name name'
    'tech_id  tech_id tech_field tech_field tech_year tech_year'
    'tech_details tech_details tech_details tech_details tech_details tech_details'
    'tech_details tech_details tech_details tech_details tech_details tech_details'
    'tech_details tech_details tech_details tech_details tech_details tech_details'
    'tech_vendors tech_vendors tech_vendors tech_vendors tech_vendors tech_vendors'
    ;
    grid-gap: 10px;
    background-color:whitesmoke; 
    padding: 10px;
}

.grid-container > div {
    background-color: rgba(255, 255, 255, 0.8);
    /* text-align: center; */
    padding: 20px 0;
    font-size: 30px;
}

</style>