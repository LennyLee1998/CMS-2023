import { defineStore } from "pinia";
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from "@/service/login/login";
import type { IAccount } from "@/types";
import { localCache } from "@/utils/cache";
import {
  firstMenu,
  mapMenusToRoutes,
  mapMenusToPermissions
} from "@/utils/map-menus";
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import useMainStore from "../main/main";

interface ILoginState {
  token: string;
  // 对于服务器返回的很复杂的数据类型，完全没有必要去一个个的列出对应类型/在网上找一些工具在线将json转成ts类型, 这里直接将userInfo设置为any类型
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

const useLoginStore = defineStore("login", {
  // 如何指定state的类型, 如果对defineStore指定泛型会比较麻烦，这里就不适用泛型，而是对state的箭头函数进行指定
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  // action支持异步请求操作, 所以没必要在组件里面进行异步操作
  actions: {
    // 1.账号登录吗获取token等信息
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account);
      const id = loginRes.data.id;
      const name = loginRes.data.name;
      this.token = loginRes.data.token;
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 2.获取登录用户的详细信息
      const userInfoRes = await getUserInfoById(id);
      // 将userInfo保存到state里面， 下面的代码让userInfo不是一个proxy对象
      const userInfo = userInfoRes.data;
      this.userInfo = userInfo;
      // 3.根据角色请求用户的权限(菜单menus)
      // 树结构
      const userMenuRes = await getUserMenusByRoleId(this.userInfo.role.id);
      const userMenus = userMenuRes.data;
      this.userMenus = userMenus;

      // 4.进行本地缓存
      localCache.setCache("userInfo", userInfo);
      localCache.setCache("userMenus", userMenus);

      // 5.请求所有roles/department数据
      // 如果刷新数据又会没有了
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();

      // 重要: 获取登录用户的所有按钮权限
      // ["system:users:create"]
      const permissions = mapMenusToPermissions(userMenus);
      this.permissions = permissions;

      // 重要:动态添加路由
      const routes = mapMenusToRoutes(userMenus);
      console.log("routes", routes);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 5.页面跳转(main页面)
      router.push("/main");
    },

    // 登录的时候有动态加载路由
    // 如果有从cache中去读取userMenus也要去加载路由(因为重新获取userMenus就是因为刷新了)
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache("userInfo");
      const userMenus = localCache.getCache("userMenus");
      // 这种情况说明用户是登录的 ??
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;

        // 1.请求所有roles/department数据
        // 刷新后重新请求数据,因为这个数据经常变化
        // 不同于上面的缓存的方式,这里重新请求就是因为这个数据经常发生变化
        const mainStore = useMainStore();
        mainStore.fetchEntireDataAction();

        // 2.获取按钮的权限
        // 刷新的时候重新做一次操作
        const permissions = mapMenusToPermissions(userMenus);
        this.permissions = permissions;

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus);
        routes.forEach((route) => {
          router.addRoute("main", route);
        });
      }
    }
  }
});

export default useLoginStore;
