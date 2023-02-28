import { localCache } from "@/utils/cache";
import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";
import { LOGIN_TOKEN } from "@/global/constants";

// 可以创建很多实例
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 所有的hyRequest只要发送网络请求了，
  interceptors: {
    requestSeccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = "Bearer" + localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        //类型缩小
        config.headers.Authorization = localCache.getCache(LOGIN_TOKEN);
      }
      // 使用非空断言, 但是非空断言有点危险
      // config.headers!.Authorization = localCache.getCache(LOGIN_TOKEN);
      return config;
    }
  }
});
export default hyRequest;
