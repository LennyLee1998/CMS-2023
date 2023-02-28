<template>
  <div class="department">
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
    >
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "@/components/page-modal/page-modal.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import useMainStore from "@/store/main/main";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

// 对modelConfig进行操作
// computed依赖store, 当store发生变化, 会重新进行计算, 自动收集响应式的依赖, 当依赖发生变化的时候,会重新计算生成新的modalConfig
const modalConfigRef = computed(() => {
  const mainStore = useMainStore();
  // 将entireDeprtments映射为符合option的label和value的departments
  const departments = mainStore.entireDepartments.map((item) => ({
    label: item.name,
    value: item.id
  }));
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options.push(...departments);
    }
  });
  return modalConfig;
});

// setup相同的逻辑抽取: hooks
// 点击search,content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// 点击content,modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal();
</script>

<style scoped>
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
