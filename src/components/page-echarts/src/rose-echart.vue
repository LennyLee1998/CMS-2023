<template>
  <div class="rose-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseEchart from "./base-echart.vue";
import type { EChartsOption } from "echarts";
import type { IEchartValueType } from "../types";

// props不能被抽取到一个独立的文件里面,但是props里面的类型可以
interface IProps {
  roseData: IEchartValueType[];
}

const props = defineProps<IProps>();

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        // 内半径.外半径的大小
        radius: [10, 160],
        // 设置区域的位置
        center: ["50%", "55%"],
        // 圆心角一样,通过半径的不同表示大小
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  };
});
</script>

<style lang="less" scoped>
.rose-echart {
  color: red;
}
</style>
