const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  propsList: [
    // 1.selection 2.index
    {
      type: "selection",
      label: "选择",
      width: "50px"
    },
    {
      type: "index",
      label: "序号",
      width: "60px"
    },
    {
      type: "normal",
      label: "角色名称",
      prop: "name",
      width: "150px"
    },
    {
      type: "normal",
      label: "权限介绍",
      prop: "intro",
      width: "150px"
    },
    {
      type: "timer",
      label: "创建时间",
      prop: "createAt"
    },
    {
      type: "timer",
      label: "更新时间"
    },

    {
      type: "handler",
      label: "操作",
      width: "180px"
    }
  ]
};

export default contentConfig;
