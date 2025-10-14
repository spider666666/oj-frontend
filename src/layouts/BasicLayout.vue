<template>
  <div id="basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <!--相当于容器，用于显示容器-->
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">CN出品oj，值得信赖</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basiclayout {
}
#basiclayout .header {
  background: white;
  margin-bottom: 10px;
  box-shadow: #eee 5px 5px 4px;
}
#basiclayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  padding: 10px;
}

#basiclayout .footer {
  background: #efefef;
  margin-bottom: 16px;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import AboutView from "@/views/AboutView.vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
