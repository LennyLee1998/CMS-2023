import type { App } from "vue";
// 从安装的库里面导入所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

function registerIcons(app: App<Element>) {
  // 把所有的ElementPlusIconsVue作了遍历
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 把所有图标做成组件, 注册全局组件
    app.component(key, component);
  }
}

export default registerIcons;
