import { ref } from "vue";
import type PageModal from "@/components/page-modal/page-modal.vue";

type CallbackFnType = (data?: any) => void;

function usePageModal(
  newCallBack?: CallbackFnType,
  editCallBack?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  function handleNewClick() {
    // 2.编辑的回调
    if (newCallBack) newCallBack();
    modalRef.value?.setModalVisible();
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来, 设置完dialogVisible之后DOM更新生效之后才能进行编辑的回调
    modalRef.value?.setModalVisible(false, itemData);
    // 2.编辑的回调
    if (editCallBack) editCallBack(itemData);
  }

  // 元组类型对顺序有严格要求
  return { modalRef, handleNewClick, handleEditClick };
}

export default usePageModal;
