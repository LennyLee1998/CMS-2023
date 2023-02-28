<template>
  <div class="chat-card">
    <el-card>
      <template #header>
        {{ title }}
      </template>
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IChartProps {
  title?: string;
}
withDefaults(defineProps<IChartProps>(), {
  title: "卡片的头部标题"
});
</script>

<style lang="less" scoped>
.chat-card {
  color: red;
}
</style>
