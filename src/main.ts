import { createApp } from 'vue'
import { useRouter } from 'vue-router';
import App from './App.vue'
import router from './router'
import store from './store'
import {confirm,prompt} from './utils/frame'
import 'element-plus/dist/index.css' // element-plus引入样式

const _router = useRouter();

const app = createApp(App);

//app.config.globalProperties.$router = _router; // 注册全局变量，不过获取比较麻烦
// 采用依赖注入
app.provide('global',{
  $prompt: prompt,
  $confirm:confirm
})

app.use(store).use(router).mount('#app')
