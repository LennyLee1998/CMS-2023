import { localCache } from "@/utils/cache";
import { createRouter, createWebHashHistory } from "vue-router";
import { LOGIN_TOKEN } from "@/global/constants";
import { firstMenu } from "@/utils/map-menus";

// 以前使用的是new Router, 表明现在正在转向函数式编程
const router = createRouter({
  // 这里可以使用hash/history模式
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: "/",
      // 重定向
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
      // component: () => import("../views/main/main.vue")
      // 二级路由
      // children: [
      //   {
      //     path: "/main/analysis/overview",
      //     component: () =>
      //       import("../views/main/analysis/overview/overview.vue")
      //   },
      //   {
      //     path: "/main/analysis/dashboard",
      //     component: () =>
      //       import("../views/main/analysis/dashboard/dashboard.vue")
      //   },
      //   {
      //     path: "/main/system/role",
      //     component: () => import("../views/main/system/role/role.vue")
      //   },
      //   {
      //     path: "/main/system/user",
      //     component: () => import("../views/main/system/user/user.vue")
      //   }
      // ]
    },
    {
      path: "/:pathMath(.*)",
      component: () => import("../views/not-found/NotFount.vue")
    }
  ]
});

// 1.获取所有的路由
// const localRoutes = [
//   {
//     path: "/main/analysis/overview",
//     component: () => import("../views/main/analysis/overview/overview.vue")
//   },
//   {
//     path: "/main/analysis/dashboard",
//     component: () => import("../views/main/analysis/dashboard/dashboard.vue")
//   },
//   {
//     path: "/main/system/role",
//     component: () => import("../views/main/system/role/role.vue")
//   },
//   {
//     path: "/main/system/user",
//     component: () => import("../views/main/system/user/user.vue")
//   }
// ];

// // 2.动态的添加路由
// router.addRoute("main", localRoutes[0]);
// router.addRoute("main", localRoutes[1]);

// 用户进行刷新: 判断用户是否登录以及是否包含userMenus菜单

// 路由导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined)
// 举个例子: / => /main
// to: /main from: / 返回值: /abc
// 刷新的时候会执行下面的函数
router.beforeEach((to) => {
  // 只有登录成功才能进入main页面
  const token = localCache.getCache(LOGIN_TOKEN);
  // if (to.path !== "/login" && !token) {
  if (to.path.startsWith("/main") && !token) {
    // token有值时才会跳转到main
    return "/login";
  }
  // 如果是进入到main
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
