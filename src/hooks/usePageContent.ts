import { ref } from "vue";
import type PageContent from "@/components/page-content/page-content.vue";

function usePageContent() {
  // 点击search,content的操作
  const contentRef = ref<InstanceType<typeof PageContent>>();
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo);
  }

  function handleResetClick() {
    contentRef.value?.fetchPageListData();
  }

  return { contentRef, handleQueryClick, handleResetClick };
}

export default usePageContent;
