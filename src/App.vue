<template>
  <div id="app">
    <!--    便于控制样式-->
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style></style>
<!--//全局文件-->
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";

//创建路由对象
const route = useRoute();
</script>
