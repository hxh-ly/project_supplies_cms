<!--  -->
<template>
  <div class="pie-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import baseEchart from '@/base-ui/echart'
import { IDataType } from '../types'
const props = defineProps<{ pieData: IDataType[] }>()
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
