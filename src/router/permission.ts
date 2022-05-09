import router from "@/router";
import { mainStore } from "@/store";
import { jsessionidIsExpired } from "@/api/login";

// 白名单
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  const store = mainStore();

  let res = jsessionidIsExpired();

  if (store.userName !== "") {
    if (to.path === "/login") {
      console.log("拦截，跳转至首页");
      next("/home");
    } else {
      console.log("放行，", to.path);
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      console.log("放行，", to.path);
      next();
    } else {
      console.log("拦截，跳转至登录页");
      next("/login");
    }
  }
});
