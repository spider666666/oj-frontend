import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import noAuth from "@/views/noAuth.vue";
import ACCESSENUMS from "@/access/accessEnums";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/Question/AddQuestionView.vue";
import QuestionListView from "@/views/Question/QuestionListView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/add/question",
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
  },
  {
    path: "/question",
    name: "题库",
    component: QuestionListView,
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: noAuth,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "仅管理员可见",
    component: AdminView,
    meta: {
      access: ACCESSENUMS.ADMIN,
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
