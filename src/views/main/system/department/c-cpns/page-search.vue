<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form ref="formRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的部门名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入查询的部门领导"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
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

// 0.定义自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);

// 1.定义form的数据
const searchForm = reactive({
  // 下面的字段不能写错, 否则到时候给服务器查询的时候会查询不到就会报错
  // 服务器会告诉接口应该是什么名字
  name: "",
  leader: "",
  createAt: ""
});

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
