<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">乐尼后台管理系统</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <!-- 这里加上属性就是true了 -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane name="account">
          <!-- 提供了自定义的插槽 -->
          <!-- 具名插槽 -->
          <template #label>
            <div class="label">
              <!-- el-icon包裹图标的目的是给里面的图标设置样式 -->
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 2.手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnAction"
      >立即登录</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { localCache } from "@/utils/cache";
import { ref, watch } from "vue";
import PaneAccount from "./pane-account.vue";
import PanePhone from "./pane-phone.vue";

const activeName = ref("account");
// 有时候这里没有初始化值, 会导致这个声明的值为any类型, 这时可以传入泛型
// 如果这里有初始化值, 就不需要传入泛型, 因为会进行类型推导
const isRemPwd = ref<boolean>(localCache.getCache("isRemPwd") ?? false);
watch(isRemPwd, (newValue) => {
  localCache.setCache("isRemPwd", newValue);
});
// 1.获取子组件的实例
// 2.调用子组件的方法
const accountRef = ref<InstanceType<typeof PaneAccount>>();

function handleLoginBtnAction() {
  if (activeName.value === "account") {
    // .value不一定有值,因为一开始这里有可能是undefined
    accountRef.value?.loginAction(isRemPwd.value);
    // if (isRemPwd.value) {
    //   console.log("记住账号和密码");
    // }
  } else {
    console.log("验证失败");
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    margin-bottom: 15px;
    text-align: center;
  }

  .tabs {
    .label {
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        margin-left: 8px;
      }
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;

    // --el-button-size: 50px !important;
  }
}
</style>
