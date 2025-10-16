<template>
  <div id="userLogin">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="userAccount" tooltip="请输入用户名名称" label="名称">
        <a-input v-model="form.userAccount" placeholder="请输入你的账号." />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import store from "@/store";
import router from "@/router";
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest); //强制把这个对象转换类型

//在表头有个字段就是提交之后选择调用什么方法

const handleSubmit = async () => {
  //调用后端的接口，实现用户的登入
  const ret = await UserControllerService.userLoginUsingPost(form);
  //判断ret的响应逻辑
  if (ret.code === 0) {
    //调用方法获取当前的用户登入信息(其实就是异步更新当前页面的用户状态值)
    await store.dispatch("user/getUserLogin");
    alert("登入成功");
    //todo表示登入成功，直接进行页面的跳转,存在循环依赖的问题，改日解决，今天这里不是重点
    // router.push({
    //   path: "/",
    //   replace: true,
    // });
  } else {
    ///登入失败，发送错误信息
    console.log("登入失败", ret.data);
  }
  console.log(form);
};
//执行异步提交的逻辑，把提交的数据交给后端逻辑进行处理，然后返回响应结果
</script>
