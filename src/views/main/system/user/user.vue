<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from "./c-cpns/user-search.vue";
import UserContent from "./c-cpns/user-content.vue";
import UserModal from "./c-cpns/user-modal.vue";
import { ref } from "vue";

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData);
}

function handleResetClick() {
  contentRef.value?.fetchUserListData();
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleNewClick() {
  modalRef.value?.setModalVisible();
}

function handleEditClick(itemData: any) {
  console.log("user.vue", itemData);
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
