import router from "@/router";
import { mainStore } from "@/store";
import { getUserInfo } from "@/api/login";

// 白名单
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  const store = mainStore();

  if (whiteList.includes(to.path)) {
    next();
  } else if (store.userName === "") {
    let res = await getUserInfo();
    if (res.code === "00000") {
      // 缓存空，但session有效
      store.userNumber = res.data.username;
      store.userName = res.data.name;
      // console.log("放行，", to.path);
      next();
    } else {
      // 缓存空，session无效
      next("/login");
    }
  } else if (to.path === "/login") {
    // 缓存有数据，但仍访问登录页
    // console.log("拦截，跳转至首页");
    next("/home");
  } else {
    // console.log("放行，", to.path);
    next();
  }
});
