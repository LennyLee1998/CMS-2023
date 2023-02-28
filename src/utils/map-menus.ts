import type { RouteRecordRaw } from "vue-router";

function loadLoadRoutes() {
  // 1.动态获取所有的路由对象,放到数组中
  //   * 路由对象都在独立的文件中
  //   * 从文件中将所有路由对象先读取到数组中(因为从文件匹配是不好匹配的)
  // 路由对象类型:RouteRecordRaw
  // 如果觉得麻烦可以直接在下面定义死
  const localRoutes: RouteRecordRaw[] = [];
  // 1.1 读取router/main所有的ts文件
  // require.context(),在webpack里是用这个方法
  // 子目录嵌套 /**/ */
  // 加上eager后一个key的路径对应一个module的value
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true
    }
  );
  // 这里的files是对象类型,key是对应的路径,value是函数,是因为这种方式希望在加载的时候进行懒加载,但是这里我们希望立即拿到对应的文件,所以在后面加上eager参数
  // key得到的是对象的key
  // 1.2 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  return localRoutes;
}

export let firstMenu: any = null;
// firstMenu.url
// 这个工具最重要的事情是将menus映射为路由
export function mapMenusToRoutes(userMenus: any[]) {
  // 重要:动态添加路由
  // 1.加载本地路由
  const localRoutes = loadLoadRoutes();

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // 匹配路由
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        // 看是否当前的routes里面已经包含过一级菜单的url,如果有表明已经加入过routes里面了
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        // 2.将二级菜单对应的路径添加到routes里面
        routes.push(route);
      }
      // firstMenu没有值且匹配到路由的情况下
      // 记录第一个被匹配到的菜单
      if (firstMenu === null && route) firstMenu = submenu;
    }
  }
  return routes;
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
  }
  return undefined;
}

interface IBreadcrumbs {
  name: string;
  path?: string;
}
// 工具函数: 由路径得到对应的menu转成面包屑,
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = [];

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url });
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  // 递归
  const ids: number[] = [];
  function recurseGetId(menus: any[]) {
    // 父级不用设置,因为父级一设置子集就会全部设置, 只要找到最底部children的id即可
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurseGetId(menuList);
  return ids;
}

/**
 * 从菜单映射到按钮的权限
 * @param menusList 菜单列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menusList: any[]) {
  const permissions: string[] = [];
  // 递归
  function recurseGetPermission(menus: any[]) {
    // 父级不用设置,因为父级一设置子集就会全部设置, 只要找到最底部children的id即可
    // 这里menus是null/undefined就会报错, 传入空数组不会进行遍历
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        recurseGetPermission(item.children ?? []);
      }
    }
  }
  recurseGetPermission(menusList);
  return permissions;
}
