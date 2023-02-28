<template>
  <div class="app">
    <!-- router-view占位, 当匹配到对应路径的时候, 找到对应组件,放到router-view的位置 -->
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
    <!-- <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <div>
      <el-link href="https://element.eleme.io" target="_blank">default</el-link>
      <el-link type="primary">primary</el-link>
      <el-link type="success">success</el-link>
      <el-link type="warning">warning</el-link>
      <el-link type="danger">danger</el-link>
      <el-link type="info">info</el-link>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<style scoped>
.app {
  /* 这里写100%的前提是父元素也是100% */
  /* height: 100%; */
  /* 这样就不用设置父元素的宽高了 */
  width: 100vw;
  height: 100vh;
  /* background-color: skyblue; */
}
</style>
