import { defineStore } from "pinia";
import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from "@/service/main/analysis/analysis";

interface IAnalysisState {
  amountList: any[];
  goodsCategoryCount: any[];
  goodsCategorySale: any[];
  goodsCategoryFavor: any[];
  goodsAddressSale: any[];
}

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amountList = res.data;
      });

      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data;
      });

      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data;
      });

      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data;
      });

      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data;
      });
    }
  }
});

export default useAnalysisStore;
