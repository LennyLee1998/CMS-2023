<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip effect="light" :content="tips" placement="top">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!-- <span v-if="amount === 'saleroom'">￥</span> -->
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="subtitle">{{ subtitle }}</span>
      <!-- <span v-if="amount === 'saleroom'">￥</span> -->
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// countup是一个类
import { CountUp } from "countup.js";
import { onMounted, ref } from "vue";

interface IProps {
  amount?: string;
  title?: string;
  tips?: string;
  number1?: number;
  number2?: number;
  subtitle?: string;
}

// 给定默认值
const props = withDefaults(defineProps<IProps>(), {
  title: "商品总销量",
  tips: "所有的商品总销量",
  number1: 509989,
  number2: 509989,
  subtitle: "商品总销量"
});

// 做一个动画就要创建一个实例
// 创建countup的实例对象
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();
onMounted(() => {
  console.log(count1Ref.value);
  // 参数一: 执行动画的元素
  // 参数二: 数组递增到10000
  // 第三个参数不写就是从0递增到10000
  // 下面写了就是从1000 => 10000
  // const countup1 = new CountUp(count1Ref.value!, 10000, {
  //   startVal: 1000
  // });
  // 要创建两个实例,因为每个实例都在创建自己的动画
  // 用类来封装,类的内聚性很强,有时候很好用
  const countOption = {
    prefix: props.amount === "saleroom" ? "￥" : ""
  };
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption);
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption);
  countup1.start();
  countup2.start();
});
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  height: 130px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 38px;
    font-size: 14px;
    color: #00000073;
  }
  .content {
    display: flex;
    // flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    font-size: 26px;
    color: #000000d9;
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    letter-spacing: 1px;
    font-size: 14px;
    color: #000000d9;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
