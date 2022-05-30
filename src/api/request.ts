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
    // console.log("error", error.response);
    // 拦截401错误，跳转到登录页面
    if (error.response.status === 401) {
      router.push("/login");
      ElMessage({
        showClose: true,
        message: "登录过期，请重新登录",
        type: "error",
        duration: 1000,
      });
      return Promise.reject(new Error("登录过期"));
    }
    // 拦截400错误
    if (error.response.status === 400) {
      ElMessage({
        showClose: true,
        message: "参数错误，请检查是否填写完整",
        type: "error",
        duration: 1000,
      })
    }
    return Promise.reject(new Error("参数错误"));
  }
);

export default service;
