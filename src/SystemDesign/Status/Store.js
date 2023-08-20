import { defineStore } from 'pinia';
import {ref,reactive} from 'vue';



export const useLoginInStore = defineStore('Login', () => {
const status=reactive({
    data:{
        IfLogin: false,
        ID:null,
        Name: null,
        IsAdmin: false,
        IsTeacher:false,
        IsStudent:false,
        Token:null,
        UserName:null,
        Password:null,

    }
})



function GetLoginStatus(){
    return status.data.IfLogin;
}

function Login(token){
    status.data.IfLogin=true;
    localStorage.setItem('Token', token);
    console.log(status.data.IfLogin);


    setTimeout(() => {
        Logout();
    }, 3 * 24 * 60 * 60 * 1000);
    
}

// 从本地存储中获取登录状态信息,使得刷新后仍然能够使用
function LoginFromLocalStorage()
{
    if(localStorage.getItem('PiniaStore'))
    {
        status.data=JSON.parse(localStorage.getItem('PiniaStore'));
    }
}

function Logout(){
    status.data={
        IfLogin: false,
        Name: null,
        IsAdmin: false,
        IsTeacher:false,
        IsStudent:false,
        Token:null,
        UserName:null,
        Password:null,
    }
    localStorage.removeItem('Token');
}

  

  
// 当用户访问应用时，检查 localStorage 中是否存在 token，如果存在就自动登录
const token = localStorage.getItem('Token');
if (token) {
Login(token);
console.log('这是Store.js:')
console.log(token);
}



return { status, Login,Logout,LoginFromLocalStorage }


})