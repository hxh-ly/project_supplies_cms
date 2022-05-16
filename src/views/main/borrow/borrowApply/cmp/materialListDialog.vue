<!--  -->
<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" width="80%" destroy-on-close>
      <xh-table
        :listData="allMaterials"
        v-bind="modelConfig.tableList"
        v-model:page="pageInfo"
        @emitSelectionChange="handleSelectionChange"
        :showFooter="false"
        :height="300"
      ></xh-table>

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
import { defineComponent, ref, onUnmounted, onMounted } from 'vue'
import XhTable from '@/base-ui/table'
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
    XhTable
  },
  emits: ['addMaterialItem'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const pageInfo = ref({})
    const formMaterial = ref(null)
    const handleSelectionChange = (item: any) => {
      //console.log(item)
      formMaterial.value = item
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
      confirmClick
    }
  }
})
</script>
<style scoped lang="less"></style>
