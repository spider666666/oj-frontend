import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import noAuth from "@/views/noAuth.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目模块",
    component: HomeView,
  },
  {
    path: "/noAuth",
    name: "noAuth",
    component: noAuth,
  },
  {
    path: "/new",
    name: "仅管理员可见",
    component: AdminView,
    meta: {
      access: "canAdmin",
    },
  },
  {
    path: "/about",
    name: "判题模块",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
