import { createApp } from 'vue'
// import './style.css'
//------Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//------

//

//

// 👇下以下修改于11月7日

import router from './SystemDesign/router/index.js';

// import { createPinia } from 'pinia';
// 👆👇换一种形式使用pinia

import pinia from './SystemDesign/Status/Pinia.js'







import App from './App.vue';


//createApp(App).mount('#app')
//------Antd
const app = createApp(App);

app.use(pinia);
app.use(router);


app.use(Antd);
app.mount('#app');
//------