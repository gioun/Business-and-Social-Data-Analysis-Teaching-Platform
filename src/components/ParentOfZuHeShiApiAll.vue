<script>
    // import dataindustry from './components/TestPageForDataIndustry_DI.vue';
    // import axiostest from './components/Axios.vue';
    // import login from './components/LoginInterface.vue'
    import ZHSapi from './components/ZuHeShiApi.vue';
    import ZHSapi2 from './components/ZuHeShiApi2.vue';
    import {provide,ref} from 'vue';
    import ZHSapi3  from './components/ZuHeShiApi3YuFaTang.vue';
    
    
    export default{
        setup(props) {
            function injectCounter2(value){
                console.log('接收来自子组件的value值:-----',value);
            };
    
    
            //这里注意传值过去传的时对象name,不能传name.value,否则会导致非响应式
            const name=ref('跨级通信name')
            provide('name',name);
    
            return{
                injectCounter2,
            }
        },
        components:{
            // dataindustry,
            // axiostest,
            // login,
            ZHSapi,
            ZHSapi2,
            ZHSapi3,
        },
    
    
    }
    </script>
    
    <template>
        <div>
            <!-- <dataindustry></dataindustry> -->
            <!-- <axiostest></axiostest> -->
            <!-- <login></login> -->
            <!-- <ZHSapi></ZHSapi> -->
            <!-- <ZHSapi2 :message="111" class="attr--show"  id="ZHSapi2" @injectCounter2="injectCounter2"></ZHSapi2> -->
            <ZHSapi3></ZHSapi3>
        </div>
    
    </template>