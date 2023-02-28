<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="80px" :model="formData" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"> </slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from "@/store/main/system/system";
import { reactive, ref } from "vue";
// import type { IModalProps } from "./type";

// 打包的时候所有的类型都会消失, 因为类型是在开发阶段作限制的,但是下面的除了限制类型,还定义了属性
export interface IModalProps {
  modalConfig: {
    pageName: string;
    header: {
      newTitle: string;
      editTitle: string;
    };

    formItems: any[];
  };
  otherInfo?: any;
}

// 0. 定义props
const props = defineProps<IModalProps>();

// 1.定义内部的属性
const dialogVisible = ref(false);
const initialForm: any = {};
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
const formData = reactive<any>(initialForm);
const isNewRef = ref(true);
const editData = ref();

// 2.获取roles/departmens数据
const systemStore = useSystemStore();

// 2.定义设置dialogVisible方法
// 暴露的时候统一暴露方法
// 方法中可以进行一些其他操作对设置进行拦截, 如果暴露属性,会无法进行拦截, 是不可控的
// isNew对是编辑/新建进行区分
function setModalVisible(isNew: boolean = true, itemData?: any) {
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
      const item = props.modalConfig.formItems.find(
        (item) => item.prop === key
      );
      formData[key] = item ? item.initialValue : "";
    }
    editData.value = null;
  }
}

// 3.点击确定的逻辑
function handleConfirmClick() {
  // 1.隐藏弹出框
  dialogVisible.value = false;
  let infoData = formData;
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo };
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    );
  } else {
    // 2.创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData);
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
