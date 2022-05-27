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
      },
      {
        path: "/repairOrder",
        name: "repairOrder",
        component: () => import("../views/orderList/repairOrder/index.vue"),
      },
      {
        path: "/completeOrder",
        name: "completeOrder",
        component: () => import("../views/orderList/completeOrder/index.vue"),
      },
      {
        path: "/reviewOrder",
        name: "reviewOrder",
        component: () => import("../views/orderList/reviewOrder/index.vue"),
      },
      {
        path: "/rejectOrder",
        name: "rejectOrder",
        component: () => import("../views/orderList/rejectOrder/index.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/order/index.vue"),
      },
      {
        path: "/adminList",
        name: "adminList",
        component: () => import("../views/userList/adminList/index.vue"),
      },
      {
        path: "/repairmanList",
        name: "repairmanList",
        component: () => import("../views/userList/repairmanList/index.vue"),
      },
      {
        path: "/studentList",
        name: "studentList",
        component: () => import("../views/userList/studentList/index.vue"),
      },
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
