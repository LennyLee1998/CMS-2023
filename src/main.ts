import { createApp } from "vue";

// 让重置的css生效
import "normalize.css";
import "./assets/css/index.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 0.针对ElMessage和ElLoading等组件引入样式, 手动引入
// 1.全局引入样式(所有样式全部引入)
// import "element-plus/dist/index.css";
// 2.组件样式引入
// import "element-plus/theme-chalk/el-message.css";
/*
3.使用vite-plugin-style-import插件
  * npm install vite-plugin-style-import consola -D
  * 在vite.config.ts中配置
*/

// 1.全局注册element-plus: 方便和简洁
// plus的全局注册是三行代码
// import ElementPlus from "element-plus";
import icons from "./global/register-icons";
import useLoginStore from "./store/login/login";

// 使用插件, 如果是函数就会执行这个函数, 并且绑定app, use内部的源码就是拿到所有组件, 对所有组件进行全局注册, 意味着使用plus里面的组件就不需要进行局部注册了, 可以直接使用
// app.use(ElementPlus);

// 2.按需引入: 用到哪一个组件再引入
// import { ElButton } from "element-plus";
// app.component(ElButton.name, ElButton)

// 3.图标的全局注册
// 从安装的库里面导入所有图标
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 对图标作了遍历, 将图标注册成组件了
// const app = createApp(App);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

// 链式写法
// createApp(App).use(router).mount("#app");

const app = createApp(App);
// 当use一个函数的时候, 函数会被自动调用, 这个函数会自动传过来一个参数就叫app
// 当调用use的时候, 就会执行registerIcons函数
app.use(icons);
// 在use函数pinia之前是不能用别的store的
// app.use(pinia);
// const loginStore = useLoginStore();
// loginStore.loadLocalCacheAction();
app.use(store);
// 注册了路由再去use(router),从本地加载是有顺序关系的
app.use(router);
// app.use(ElementPlus);
app.mount("#app");
