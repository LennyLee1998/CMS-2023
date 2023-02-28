<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";

import PageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";

import PageModal from "@/components/page-modal/page-modal.vue";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMainStore from "@/store/main/main";
import { storeToRefs } from "pinia";
import type { ElTree } from "element-plus";
import { mapMenuListToIds } from "@/utils/map-menus";

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallback,
  eidtCallback
);

// 获取完整的菜单
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});
const treeRef = ref<InstanceType<typeof ElTree>>();
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
}

function eidtCallback(itemData: any) {
  // 将拿到的menuList设置回显到modal中
  console.log("点击了编辑", itemData.menuList);

  // nextTick的回调在Vue3中是一个微任务
  // promise.resolve().then(fn)
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList);
    treeRef.value?.setCheckedKeys(menuIds);
  });
}
</script>

<style scoped></style>
