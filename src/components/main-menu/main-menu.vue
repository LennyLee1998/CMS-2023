<template>
  <div class="main-menu">
    <!-- 1. logo -->
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">乐尼管理系统</h2>
    </div>

    <!-- 2. menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <!-- 必须要有index标识 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串： el-icon-monitor=>组件 component动态组件 -->
              <el-icon>
                <!-- 字符串操作： 必须知道服务器返回的字符串是什么结构-->
                <!-- 图标的处理过程 -->
                <component :is="item.icon.split('-icon')[1]" />
              </el-icon>
              <!-- 逻辑判断来确定很麻烦 -->
              <!-- <template v-if="item.icon === 'el-icon-monitor'">
                <el-icon><Monitor /></el-icon>
              </template> -->
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login/login";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, computed } from "vue";
import { firstMenu, mapPathToMenu } from "@/utils/map-menus";

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

// 1.获取动态的菜单
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

// 2.监听item的点击
const router = useRouter();
function handleItemClick(item: any) {
  const url = item.url;
  router.push(url);
}

// 3.ElMenu的默认菜单
// 用路径去匹配对应的value
const route = useRoute();
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus);
  return pathMenu.id + "";
});
</script>

<style lang="less" scoped>
.main-menu {
  color: red;
  .logo {
    display: flex;
    align-items: center;

    height: 48px;
    padding: 12px 10px 8px;
    box-sizing: border-box;
    img {
      height: 28px;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      color: #fff;
      white-space: nowrap;
    }
  }
}

// :deep(.el-menu) {
//   --el-menu-bg-color: #0c2135 !important;
//   // background-color: #0c2135;
//   --el-menu-hover-bg-color: #0a60bd !important;
// }

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;

    &.is-active {
      background-color: #0a60bd;
    }
  }
  .el-menu-item:hover {
    color: #fff;
  }
}
</style>
