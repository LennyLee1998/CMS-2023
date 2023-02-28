import useLoginStore from "@/store/login/login";

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore();
  const { permissions } = loginStore;

  // 这里我们希望返回的是布尔类型,用Boolean进行包裹
  // 用两个!!, 一个感叹号取反为false, 然后再取反就变成布尔类型了
  return !!permissions.find((item) => item.includes(permissionID));
  // return Boolean(permissions.find((item) => item.includes(permissionID)));
}

export default usePermissions;
