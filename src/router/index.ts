import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/",
    name: "/",
    component: () => import("../layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue"),
      }, {
        path: "/repairOrder",
        name: "repairOrder",
        component: () => import("../views/orderList/repairOrder/index.vue"),
      }, {
        path: "/completeOrder",
        name: "completeOrder",
        component: () => import("../views/orderList/completeOrder/index.vue"),
      }, {
        path: "/reviewOrder",
        name: "reviewOrder",
        component: () => import("../views/orderList/reviewOrder/index.vue"),
      }, {
        path: "/rejectOrder",
        name: "rejectOrder",
        component: () => import("../views/orderList/rejectOrder/index.vue"),
      }, {
        path: "/order",
        name: "order",
        component: () => import("../views/order/index.vue"),
      }, {
        path: "/adminList",
        name: "adminList",
        component: () => import("../views/userList/adminList/index.vue"),
      }, {
        path: "/repairmanList",
        name: "repairmanList",
        component: () => import("../views/userList/repairmanList/index.vue"),
      }, {
        path: "/norUserList",
        name: "norUserList",
        component: () => import("../views/userList/norUserList/index.vue"),
      }, {
        path: "/user",
        name: "user",
        component: () => import("../views/user/index.vue"),
      }, {
        path: "/addUser",
        name: "addUser",
        component: () => import("../views/addUser/index.vue"),
      }, {
        path: "/carouselList",
        name: "carouselList",
        component: () => import("../views/carouselList/index.vue"),
      }, {
        path: "/carousel",
        name: "carousel",
        component: () => import("../views/carousel/index2.vue"),
      }, {
        path: "/noticeList",
        name: "noticeList",
        component: () => import("../views/noticeList/index.vue"),
      }, {
        path: "/notice",
        name: "notice",
        component: () => import("../views/notice/index.vue"),
      }, {
        path: "/addNotice",
        name: "addNotice",
        component: () => import("../views/addNotice/index.vue"),
      }, {
        path: "/articleList",
        name: "articleList",
        component: () => import("../views/articleList/index.vue"),
      }, {
        path: "/article",
        name: "article",
        component: () => import("../views/article/index.vue"),
      }, {
        path: "/addArticle",
        name: "addArticle",
        component: () => import("../views/addArticle/index.vue"),
      }, {
        path: "/pickerTime",
        name: "pickerTime",
        component: () => import("../views/picker/pickerTime/index.vue"),
      }, {
        path: "/addPickerTime",
        name: "addPickerTime",
        component: () => import("../views/picker/addPickerTime/index.vue"),
      }, {
        path: "/pickerLocation",
        name: "pickerLocation",
        component: () => import("../views/picker/pickerLocation/index.vue"),
      }, {
        path: "/addPickerLocation",
        name: "addPickerLocation",
        component: () => import("../views/picker/addPickerLocation/index.vue"),
      }, {
        path: "/pickerDes",
        name: "pickerDes",
        component: () => import("../views/picker/pickerDes/index.vue"),
      }, {
        path: "/addPickerDes",
        name: "addPickerDes",
        component: () => import("../views/picker/addPickerDes/index.vue"),
      }, {
        path: "/feedback",
        name: "feedback",
        component: () => import("@/views/feedback/index.vue"),
      }, {
        path: "/addFeedback",
        name: "addFeedback",
        component: () => import("@/views/addFeedback/index.vue"),
      }
    ],
  },
  {
    path: "/templateTest",
    name: "templateTest",
    component: () => import("../template/orderList.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;
