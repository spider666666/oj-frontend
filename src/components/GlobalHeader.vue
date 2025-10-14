<template>
  <a-row id="globalheader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectKey"
        @menu-item-click="doMenuJump"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.svg" />
            <div class="title">CNOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routesChoose" :key="item.path">
          <!--          推荐使用默认变量，要是不存在就完了-->
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.userLogin?.userName ?? "未登入" }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: #444;
  margin-left: 10px;
}
.logo {
  height: 48px;
}
</style>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
//导入路径，导入路径别名，默认导入的是该路径下的默认导入模块，会创建一个store实例
import store from "@/store";
import checkAccess from "@/access/checkAccess";

//实现页面跳转的功能
//这个对象是用来机型路由的跳转的
const router = useRouter();

const doMenuJump = (key: string) => {
  router.push({
    path: key,
  });
};

//当选择菜单项的时候进行高亮
//设置默认高亮
const selectKey = ref(["/"]);
//在路由跳转之后重新设置菜单项
router.afterEach((to) => {
  //这里是一个数组
  selectKey.value = [to.path];
});

//定时修改用户登入状态
//方法调用完要使用；结尾
// setTimeout(() => {
//   store.dispatch("user/getUserLogin", {
//     userName: "CN",
//     role: "admin",
//   });
// }, 300);

//获取登入用户
const loginUser = store.state.user.userLogin;
//实现查找隐藏页面的逻辑
const routesChoose = routes.filter((item, index) => {
  //判断隐藏页面
  if (item.meta?.hideInMenu) {
    return false;
  }
  //判断当前用户是否有权限访问当前页面
  if (!checkAccess(loginUser, item?.meta?.access as string)) {
    return false;
  }
  return true;
});
</script>
