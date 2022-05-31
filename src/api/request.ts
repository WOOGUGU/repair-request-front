import { ElMessage } from "element-plus";
import axios, { AxiosInstance } from "axios";
import router from "@/router";

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
    console.log("响应拦截器-res", res);
    // 响应拦截器
    // console.log("响应拦截器");
    let data = res.data;

    return data;
  },
  (error) => {
    console.log("error", error);
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          ElMessage.error("参数错误");
          break;
        case 401:
          ElMessage.error("登录失效，请重新登录");
          router.push("/login");
          break;
        case 403:
          ElMessage.error("没有权限");
          break;
        case 404:
          ElMessage.error("请求资源不存在");
          break;
        case 500:
          ElMessage.error("服务器错误");
          break;
        default:
          ElMessage.error("未知错误");
          break;
      }
    }
    return Promise.reject(new Error("参数错误"));
  }
);

export default service;
