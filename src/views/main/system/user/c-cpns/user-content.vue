<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <!-- 尽量将能确定宽度的column都设置宽度, 剩余的宽度会被平分 -->
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column
          type="index"
          label="序号"
          width="60px"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户名"
          width="120px"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="120px"
          align="center"
        />
        <el-table-column
          prop="cellphone"
          label="手机号码"
          width="150px"
          align="center"
        />
        <el-table-column prop="enable" label="状态" width="80px" align="center">
          <!-- 作用域插槽, 是内部在遍历每一条数据,遍历到数据后,再反向将数据传回到column中-->
          <!-- 如果不写template这里默认就是default插槽, 如果写,这里就是default插槽 -->
          <!-- 这里不仅是传了enable,而是传了整行的数据row -->
          <!-- 三元运算符 -->
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              type="primary"
              size="small"
              text
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="isDelete"
              size="small"
              type="danger"
              text
              icon="DeleteFilled"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system";
import { storeToRefs } from "pinia";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";
import usePermissions from "@/hooks/usePermissions";

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);

// 用户的权限判断
const isCreate = usePermissions("users:create");
const isDelete = usePermissions("users:delete");
const isUpdate = usePermissions("users:update");
const isQuery = usePermissions("users:query");

// 1.发起action, 请求usersList的数据
const systemStore = useSystemStore();
// 数据要放在前面,因为进入页面就进行了网络请求
const currentPage = ref(1);
const pageSize = ref(10);
// 这个网络请求的action在这个页面里面做会更加方便,因为后面还要在这里做分页,一改变页码又要做请求, 就可以直接在user-content里面发送请求,不需要去别的页面
fetchUserListData();

// 2.获取usersList数据, 进行展示
// 这里的usersList在第一次的时候由于上面的acion是一个异步函数,是一个空数组,后面才有usersList的值,但是这个usersList不是响应式的
// 方法一:改成computed 方法二:storeToTefs对store进行包裹后,解构出来的usersList就是响应式的,一旦改变上面就会自动刷新
const { usersList, usersTotalCount } = storeToRefs(systemStore);

// 3.页码相关逻辑
function handleSizeChange() {
  fetchUserListData();
}
function handleCurrentChange() {
  fetchUserListData();
}

// 4.定义函数,用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return;

  // 4.1.获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  // 4.2.发起网络请求
  // 构建对象字面量对象
  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postuserListAction(queryInfo);
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id).then(() => {
    currentPage.value = 1;
    pageSize.value = 10;
  });
}
function handleNewUserClick() {
  emit("newClick");
}
function handleEditBtnClick(itemData: any) {
  // 这里传递row数据,因为row之后要回显
  console.log("编辑用户", itemData);
  emit("editClick", itemData);
}

defineExpose({ fetchUserListData });
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px;
  }
  :deep(.cell) {
    padding: 0;
  }
}
.el-button {
  margin-left: 0;
  padding: 5px 8px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
