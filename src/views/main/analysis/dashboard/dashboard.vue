<template>
  <div class="dashboard">
    <!--  <div ref="divRef" :style="{ width: '500px', height: '600px' }"></div> -->
    <el-row :gutter="10">
      <el-col :span="7"
        ><hy-card title="分类商品数量(饼图)">
          <pie-chart :pie-data="categoryGoodsCount"></pie-chart> </hy-card
      ></el-col>
      <el-col :span="10"
        ><hy-card title="不同城市商品销量">
          <map-chart :map-data="addressGoodsSale"></map-chart> </hy-card
      ></el-col>
      <el-col :span="7"
        ><hy-card title="分类商品数量(玫瑰图)">
          <rose-chart :rose-data="categoryGoodsCount"></rose-chart> </hy-card
      ></el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12"
        ><hy-card title="分类商品的销量">
          <line-chart v-bind="categoryGoodsSale"></line-chart> </hy-card
      ></el-col>
      <el-col :span="12"
        ><hy-card title="分类商品的收藏">
          <bar-chart v-bind="categoryGoodsFavor"></bar-chart></hy-card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { userStore } from '@/store'

import { PieChart, RoseChart, LineChart, BarChart, MapChart } from '@/components/page-chart'
import HyCard from '@/base-ui/card'
export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    PieChart,
    RoseChart,
    LineChart,
    BarChart,
    MapChart
  },
  setup() {
    const divRef = ref<HTMLElement>()
    const store = userStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => ({
        name: item.name,
        value: item.goodsCount
      }))
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return {
        xLabels,
        values
      }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    onMounted(() => {
      /*      const echartInstance = echarts.init(divRef.value!)

      echartInstance.setOption(option) */
    })

    return {
      divRef,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
