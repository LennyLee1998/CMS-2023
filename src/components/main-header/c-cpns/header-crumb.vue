<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="caretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useLoginStore from "@/store/login/login";
import { mapPathToBreadcrumbs } from "@/utils/map-menus";

const loginStore = useLoginStore();
const route = useRoute();
// 拿到面包屑以后对面包屑进行遍历
// 计算属性
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, loginStore.userMenus);
});
</script>

<style lang="less" scoped>
.header-crumb {
  color: red;
}
</style>
