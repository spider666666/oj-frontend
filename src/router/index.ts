import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routes } from "../router/routes";

// 这里将在其他文件创建的路由导入进去
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
