<template>
  <div class="line-echart">
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
      data: props.labels
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: props.values,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        }
      }
    ]
  };
});
</script>

<style lang="less" scoped>
.line-echart {
  color: red;
}
</style>
