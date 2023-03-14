import axios from 'axios'
import {AxiosInstance} from 'axios';

const baseURL:string = 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api/'
const service:AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers:{
    'Content-Type':'application/json;charset=utf-8'
  }
})

// 请求拦截
service.interceptors.request.use(function(config){
  config.headers = config.headers || {};
  if(localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token');
  }
  return config
})

// 响应拦截
service.interceptors.response.use(function(response){
  const code:number = response.data.code || response.data.data.code;
  
  if(code != 200) {
    return Promise.reject(response.data);
  }

  return response.data;
},function(err) {
  console.log(err);
})

export default service;