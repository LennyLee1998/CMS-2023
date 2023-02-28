<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFlod ? '60px' : '210px'">
        <main-menu :is-Fold="isFlod" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <!-- user/role/department在做占位 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <h2>main</h2>
    <button @click="handleExitClick">退出登录</button> -->
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/main-menu.vue";
import MainHeader from "@/components/main-header/main-header.vue";
import { ref } from "vue";

// 处理main-header中折叠的变化
// 这里的参数最好可以进行区分，不要使用一样的名字
const isFlod = ref(false);
function handleFoldChange(flag: boolean) {
  isFlod.value = flag;
}
</script>

<style lang="less" scoped>
.main {
  // color: red;
  height: 100%;
}

.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #001529;
    scrollbar-width: none; // firefox
    --ms-overflow-style: none; //IE 10+

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
    background-color: #f5f5f5;
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
