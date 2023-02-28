<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? "新建数据"
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <!-- 尽量将能确定宽度的column都设置宽度, 剩余的宽度会被平分 -->
        <template v-for="item in contentConfig.propsList" :key="item.label">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSystemStore from "@/store/main/system/system";
import { storeToRefs } from "pinia";
import { formatUTC } from "@/utils/format";
import usePermissions from "@/hooks/usePermissions";

interface IProps {
  contentConfig: {
    pageName: string;
    header?: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any[];
    childrenTree?: any;
  };
}

const props = defineProps<IProps>();

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`);
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`);
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`);
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`);

// 1.发起action, 请求usersList的数据
const systemStore = useSystemStore();
// 数据要放在前面,因为进入页面就进行了网络请求
const currentPage = ref(1);
const pageSize = ref(10);

// 6.监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  // name记录当前action是什么样的action
  console.log("action被调用", name);
  // 等action都执行完成的时候才会回调after函数
  after(() => {
    if (
      name === "newPageDataAction" ||
      name === "editPageDataAction" ||
      name === "deletePageByIdAction"
    ) {
      currentPage.value = 1;
    }
  });
});

// 这个网络请求的action在这个页面里面做会更加方便,因为后面还要在这里做分页,一改变页码又要做请求, 就可以直接在user-content里面发送请求,不需要去别的页面
fetchPageListData();

// 2.获取usersList数据, 进行展示
// 这里的usersList在第一次的时候由于上面的acion是一个异步函数,是一个空数组,后面才有usersList的值,但是这个usersList不是响应式的
// 方法一:改成computed 方法二:storeToTefs对store进行包裹后,解构出来的usersList就是响应式的,一旦改变上面就会自动刷新
const { pageList, pageTotalCount } = storeToRefs(systemStore);

// 3.页码相关逻辑
function handleSizeChange() {
  fetchPageListData();
}
function handleCurrentChange() {
  fetchPageListData();
}

// 4.定义函数,用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // 如果没有查询权限,直接退出函数,不能获取数据
  if (!isQuery) return;

  // 4.1.获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  // 4.2.发起网络请求
  // 构建对象字面量对象
  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo);
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore
    .deletePageByIdAction(props.contentConfig.pageName, id)
    .then(() => {
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

defineExpose({ fetchPageListData });
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
