import {
  postUsersListData,
  deteleUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from "@/service/main/system/system";
import { defineStore } from "pinia";
import { stringifyQuery } from "vue-router";
import useMainStore from "../main";
import type { ISystemState } from "./type";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postuserListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo);
      const { totalCount, list } = usersListResult.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    },

    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deteleUserById(id);
      console.log(deleteResult);

      // 2.重新请求新的数据
      this.postuserListAction({ offset: 0, size: 10 });
    },

    async neweUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo);
      console.log(newResult);

      // 2.重新请求新的数据
      this.postuserListAction({ offset: 0, size: 10 });

      // 3.获取完整的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo);
      console.log(editResult);

      // 2.重新请求新的数据
      this.postuserListAction({ offset: 0, size: 10 });

      // 3.获取完整的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
    // 针对页面的数据: 增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageListResult.data;

      this.pageList = list;
      this.pageTotalCount = totalCount;
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id);
      console.log(deleteResult);

      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 获取完整的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      // promise失败来到catch里面
      // new Promise().then().catch()
      // await失败在try..catch里面
      const newResult = await newPageData(pageName, pageInfo);
      console.log(newResult);
      console.log(pageInfo);
      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 获取完整的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo);
      console.log(editResult);
      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 获取完整的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    }
  }
});
export default useSystemStore;
