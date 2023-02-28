<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="80px" :model="formData" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请输入选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请输入选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system/system";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

// 1.定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
});
const isNewRef = ref(true);
const editData = ref();

// 2.获取roles/departmens数据
const mainStore = useMainStore();
const systemStore = useSystemStore();
const { entireRoles, entireDepartments } = storeToRefs(mainStore);

// 2.定义设置dialogVisible方法
// 暴露的时候统一暴露方法
// 方法中可以进行一些其他操作对设置进行拦截, 如果暴露属性,会无法进行拦截, 是不可控的
// isNew对是编辑/新建进行区分
function setModalVisible(isNew: boolean = true, itemData?: any) {
  console.log("拦截");
  dialogVisible.value = true;
  isNewRef.value = isNew;

  if (!isNew && itemData) {
    //编辑数据
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    //新建数据
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
}

// 3.点击确定的逻辑
function handleConfirmClick() {
  // 1.隐藏弹出框
  dialogVisible.value = false;
  if (!isNewRef.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, formData);
  } else {
    // 2.创建新的用户
    systemStore.neweUserDataAction(formData);
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible });
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
