import axios, { AxiosInstance } from "axios";

const service: AxiosInstance = axios.create({
  baseURL: "/api-dev",
  timeout: 5000,
});

// 请求拦截器（在请求之前进行一些配置）
service.interceptors.request.use(
  (config) => {
    // 请求拦截器
    // console.log("请求拦截器");
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// 响应拦截器（在响应之后对数据进行一些处理）
service.interceptors.response.use(
  (res) => {
    // 响应拦截器
    // console.log("响应拦截器");
    let data = res.data;
    return data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default service;
