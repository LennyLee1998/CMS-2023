import hyRequest from "../index";
import type { IAccount } from "@/types";

export function accountLoginRequest(account: IAccount) {
  // GET请求时，使用params，参数会直接追加至请求字符串(url)后, POST请求时，使用data，参数是添加到请求体(body)的
  return hyRequest.post({
    url: "/login",
    data: account
  });
}

export function getUserInfoById(id: number) {
  // 这里必须做authorization授权，这个接口在请求的时候是必须要携带token的
  // 不止这个接口要携带token，后面所有的接口都要携带token,因为没有token不可能创建用户，删除用户，修改用户....
  return hyRequest.get({
    url: `/users/${id}`
    // token是放在headers里面，但是没有必要每个请求里面都加上headers，而是在请求拦截里面
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  });
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  });
}
