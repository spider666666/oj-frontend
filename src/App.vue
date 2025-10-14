<template>
  <div id="app">
    <!--    便于控制样式-->
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<!--//全局文件-->
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import store from "@/store";

//在跳转路由之前进行权限的校验
const router = useRouter();
router.beforeEach((to, from, next) => {
  //判断是否需要进行权控制
  if (to.meta.access === "canAdmin") {
    //表明可以不被放行
    if (store.state.user.userLogin?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
