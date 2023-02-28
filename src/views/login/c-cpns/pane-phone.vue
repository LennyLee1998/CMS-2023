<template>
  <div class="pane-phone">
    <el-form :model="phone" size="large" label-width="60px">
      <el-form-item label="手机号">
        <el-input v-model="phone.pNumber" />
      </el-form-item>
      <el-form-item label="验证码" class="el-item">
        <div class="verify-code">
          <el-input v-model="phone.code" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const phone = reactive({
  pNumber: "",
  code: ""
});
</script>

<style lang="less" scoped>
.pane-phone {
  color: red;
}
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
