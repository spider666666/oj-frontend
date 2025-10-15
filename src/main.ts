import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import "./access/index";
// 在main文件中使用./作为目录名
createApp(App).use(store).use(ArcoVue).use(router).mount("#app");
