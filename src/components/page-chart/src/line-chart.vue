<!--  -->
<template>
  <div class="line-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import baseEchart from '@/base-ui/echart'
const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    values: any[]
  }>(),
  {
    title: ''
  }
)
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
