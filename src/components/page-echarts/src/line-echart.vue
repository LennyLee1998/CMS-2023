<template>
  <div class="line-chart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from "./base-echart.vue";
import type { EChartsOption } from "echarts";
import { computed } from "vue";

interface IProps {
  labels: string[];
  values: number[];
}

const props = defineProps<IProps>();

const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.labels
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: props.values,
        type: "line",
        areaStyle: {}
      }
    ]
  };
});
</script>

<style lang="less" scoped>
.line-chart {
  color: red;
}
</style>
