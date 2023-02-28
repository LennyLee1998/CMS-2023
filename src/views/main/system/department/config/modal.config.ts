import type { IModalConfig } from "@/components/page-modal/type";

const modalConfig: IModalConfig = {
  pageName: "department",
  header: {
    newTitle: "新建部门",
    editTitle: "编辑部门"
  },
  formItems: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      width: "150px",
      placeholder: "请输入部门名称"
      // initialValue: ""
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      width: "150px",
      placeholder: "请输入部门领导"
    },

    {
      type: "select",
      label: "上级部门",
      prop: "parentId",
      width: "150px",
      placeholder: "请输入上级部门",
      options: []
    }
  ]
};
export default modalConfig;
