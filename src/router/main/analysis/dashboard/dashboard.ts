// 禁用ts的volar插件会导致.vue文件无法被识别
const dashboard = () => import("@/views/main/analysis/dashboard/dashboard.vue");
export default {
  path: "/main/analysis/dashboard",
  name: "dashboard",
  component: dashboard,
  children: []
};
