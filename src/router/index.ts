import { createRouter, createWebHashHistory } from "vue-router";

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
        component: () => import("../views/repairOrder/index.vue"),
      },
      {
        path: "/completeOrder",
        name: "completeOrder",
        component: () => import("../views/completeOrder/index.vue"),
      },
      {
        path: "/reviewOrder",
        name: "reviewOrder",
        component: () => import("../views/reviewOrder/index.vue"),
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
  history: createWebHashHistory(),
  routes,
});

export default router;
