import hyRequest from "@/service";

// 用户的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  });
}
// 1.删除数据操作
export function deteleUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  });
}

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: "/users",
    // 在服务器中转成sql语句
    data: userInfo
  });
}
//
export function editUserData(id: number, userInfo: any) {
  // 修改数据用的是patch
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  });
}

//针对页面的网络请求: 增删改查
// 写一个函数工具,根据不同情况返回不同情况
// function getPageUrl() {}
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  });
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  });
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  });
}
