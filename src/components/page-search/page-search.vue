<template>
  <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      ref="formRef"
      :model="searchForm"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2. 重置和搜索的按钮-->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";
import usePermissions from "@/hooks/usePermissions";

// 0.定义自定义事件/接受的属性
interface IProps {
  searchConfig: {
    pageName: string;
    labelWidth?: string;
    formItems: any[];
  };
}
const emit = defineEmits(["queryClick", "resetClick"]);
// 泛型
const props = defineProps<IProps>();
// 获取权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`);

// 1.定义form的数据
// 不能写死,这里对fromItems这个数组进行遍历
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
console.log(initialForm);
const searchForm = reactive(initialForm);

// 重置操作
// 组件实例的类型
const formRef = ref<InstanceType<typeof ElForm>>();
function handleResetClick() {
  // 1.form中的数据全部重置
  // 要想通过下面的方法进行重置, 必须要明确的绑定每一个el-form-item对应的是绑定searchForm里面的哪一个属性(通过属性prop)
  // 这样在重置的时候才知道要用里面的哪一个字段对内容进行重置
  formRef.value?.resetFields();

  // 2.将事件emit出去,content内部重新发送网络请求
  emit("resetClick");
}

// 查询部分涉及到后端接口的问题, 等后面展示数据再说
function handleQueryClick() {
  emit("queryClick", searchForm);
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 30px 40px;
    margin-bottom: 0;
  }

  .btns {
    // display: flex;
    // justify-content: flex-end;
    // padding-right: 60px;
    // 因为button是行内元素
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
