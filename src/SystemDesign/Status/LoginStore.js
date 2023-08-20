import { defineStore } from 'pinia';
import {ref,reactive} from 'vue';

export const LoginStore = defineStore('LoginStore', {
    state: () => {
        return {
         // 使用对象,便于之后使用json解析字符串
        data:{
                IfLogin: false,
                Name: null,
                IsAdmin: false,
                IsTeacher:false,
                IsStudent:false,
                Token:'',
                UserName:null,
                Password:null,
            }
        }
    },
    getters: {
    
    },
    actions: {
        Login(JsonString){
          this.data=JSON.parse(JsonString);  
          localStorage.setItem('LoginData', JsonString);

        },
        Logout(){
            this.$reset();
            localStorage.removeItem('LoginData');
        },

    },
    


})