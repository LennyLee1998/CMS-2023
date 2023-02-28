<template>
  <div class="pie-chart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from "./base-echart.vue";
import type { IEchartValueType } from "../types";
import type { EChartsOption } from "echarts";
import { computed } from "vue";

interface IProps {
  pieData: IEchartValueType[];
}

const props = defineProps<IProps>();

// 包裹一层computed,会收集data的依赖,一旦data改变, 可以重新渲染template
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
});
</script>

<style lang="less" scoped>
.pie-chart {
  color: red;
}
</style>
