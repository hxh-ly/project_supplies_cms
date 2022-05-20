<!--  -->
<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" width="60%" destroy-on-close>
     <!--  <xh-table :listData="allMaterials" :listCount="10" v-bind="modelConfig.tableList" v-model:page="pageInfo"
        @emitSelectionChange="handleSelectionChange"></xh-table>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </span>
      </template>
        -->
         <info-material></info-material>
         <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted,watch } from 'vue'
import {dgut_getMaterialListData} from '@/serve/DgutRequest/dgutRequest'
import InfoMaterial from '@/views/main/material/infoMaterial/infoMaterial.vue'
import XhTable from '@/base-ui/table'
import bus from 'vue3-eventbus'
export default defineComponent({
  props: {
    allMaterials: {
      type: Object
    },
    modelConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    XhTable,
    InfoMaterial
  },
  emits: ['addMaterialItem'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    const formMaterial = ref(null)
    const handleSelectionChange = (item: any) => {
      //console.log(item)
      formMaterial.value = item
    }
    bus.on('foo', (e:any) =>
    {
       formMaterial.value=e
       console.log(e)
    }

     )

    const getPageListData = () => {
      dgut_getMaterialListData('/material/list', { size: 20, current: 1 }).then(
        (res: any) => {
         /*  allMaterials.value = res.data?.list?.records || [] */
          //console.log(allMaterials.value);
        }
      )
    }
    const confirmClick = () => {
      //console.log(formMaterial.value)
      emit('addMaterialItem', formMaterial.value)
      dialogVisible.value = false
    }
    onMounted(() => {
      console.log('mounted')
    })
    onUnmounted(() => {
      console.log('销毁了')
    })
    return {
      dialogVisible,
      pageInfo,
      handleSelectionChange,
      formMaterial,
      confirmClick,
      getPageListData
    }
  }
})
</script>
<style scoped lang="less">
</style>
