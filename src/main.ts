import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import "./access/index";
// 引入全局样式，main是页面的统一入口文件
import 'bytemd/dist/index.css'
router.beforeEach((to, from) => {
  console.log(
    "匹配的路由:",
    to.matched.map((record) => record.path)
  );
});

// 在main文件中使用./作为目录名
createApp(App).use(store).use(ArcoVue).use(router).mount("#app");
