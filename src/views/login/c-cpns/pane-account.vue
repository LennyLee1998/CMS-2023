<template>
  <div class="pane-account">
    <!-- status-icon会根据状态在右边显示不同的小图标 -->
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <!-- props是为了标识form-item是name, 待会校验就会从accountRules找出针对name缩写的所有校验规则对下面的item起作用 -->
      <el-form-item label="账号" prop="name">
        <!-- 下面的v-model是为了绑定数据,而不是规则 -->
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// import hyRequest from "@/service";
import type { FormRules, ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import useLoginStore from "@/store/login/login";
import type { IAccount } from "@/types";
import { localCache } from "@/utils/cache";

// 这里的name和passsword只会在这个里面使用，所以不需要在global里面定义
const CACHE_NAME = "name";
const CACHE_PASSWORD = "password";

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? "",
  password: localCache.getCache(CACHE_PASSWORD) ?? ""
});

// 2.定义校验规则
const accountRules: FormRules = {
  // 数组类型, 因为放了多个校验规则, 有几种校验情况
  name: [
    // message表示不符合规则地时候给出地提示
    // trigger当前规则在什么情况触发, blur失去焦点
    // 校验的什么东西, 下面情况就是账号必须要输入, required为true就表示是必须要传的东西
    { required: true, message: "必须输入账号信息~", trigger: "blur" },
    {
      // 支持正则, 匹配字符串的利器
      pattern: /^[a-z0-9]{6,20}$/,
      // min: 6,
      // max: 20,
      message: "必须是6~20个字母或数字",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "必须输入密码", trigger: "blur" },
    // { min: 3, message: "密码必须在3位以上", trigger: "blur" }
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须在3位以上数字或字母组成",
      trigger: "blur"
    }
  ]
};

// 3.执行账号的登录逻辑
// 拿到el-form, 要从elment-plus里面导入ElForm组件, 在下面用作类型
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();

function loginAction(isRemPwd: boolean) {
  console.log(
    // 准备登录的时候, 进一步看一下form里面的东西是否验证成功
    formRef.value?.validate((valid) => {
      if (valid) {
        // 在valid里面做登录的操作
        // 1.获取用户输入的账号和密码
        const name = account.name;
        const password = account.password;

        // 2.向服务器发送网络请求(携带账号密码)
        loginStore.loginAccountAction({ name, password }).then(() => {
          // 等到登录成功再记住密码和删除密码
          // 3.判断是否需要记住密码
          if (isRemPwd) {
            localCache.setCache(CACHE_NAME, name);
            localCache.setCache(CACHE_PASSWORD, password);
          } else {
            localCache.removeCache(CACHE_NAME);
            localCache.removeCache(CACHE_PASSWORD);
          }
        });
        // 这里的account是一个reactive对象, 不希望保留响应式, 所以这里是将属性取出来再组成一个新的对象
        // accountLoginRequest({ name, password }).then((res) => {
        //   console.log(res);
        // });
      } else {
        // 在这里不合格的时候做提示
        ElMessage.error("请输入正确的格式后再操作");
      }
    })
  );
}

defineExpose({
  loginAction
});
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
