<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <!-- xs响应式布局 -->
        <el-col class="chart" :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10" class="chart">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="chart">
      <el-col :span="12">
        <chart-card>
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CountCard from "./c-cpns/count-card/count-card.vue";
import ChartCard from "./c-cpns/chart-card/chart-card.vue";
import useAnalysisStore from "@/store/main/analysis/analysis";
import { storeToRefs } from "pinia";
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echarts";
import { computed } from "vue";
// echarts导出的时候是通过export {}, 所以里面没有export default
// import * as echarts from "echarts";
// import { onMounted, ref } from "vue";

// 1.发起数据的请求
const analysisStore = useAnalysisStore();
analysisStore.fetchAnalysisDataAction();

// 2.从store中获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore);

// 3.获取数据, 映射得到新的数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});
// const showGoodsCategorySale = computed(() => {
//   return goodsCategoryCount.value.map((item) => ({
//     name: item.name,
//     value: item.goodsCount
//   }));
// });

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name);
  const values = goodsCategorySale.value.map((item) => item.goodsCount);
  return { labels, values };
});
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name);
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor);
  return { labels, values };
});

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }));
});
// const divRef = ref<HTMLElement>();
// onMounted(() => {
//   // 1.初始化echarts实例
//   const eChartInstance = echarts.init(divRef.value!, "light", {
//     renderer: "svg"
//   });
//   // 要么就是option很复杂
//   // 要么就是数据改变后setOption在设置一次
//   // 2.编写配置文件
//   const option = {
//     title: {
//       text: "ECharts 入门示例",
//       subtitle: "哈哈哈"
//     },
//     tooltip: {
//       trigger: "axis",
//       axisPointer: {
//         type: "line"
//       }
//     },
//     legend: {
//       data: ["销量"]
//     },
//     xAxis: {
//       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "销量",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20]
//       }
//     ]
//   };
//   // 3.设置配置,并且开始绘制
//   eChartInstance.setOption(option);
// });
</script>

<style scoped>
.table {
  width: 600px;
  height: 500px;
  /* background-color: #00f; */
}
.chart {
  margin-top: 20px;
}
</style>
