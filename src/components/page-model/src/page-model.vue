<!--  -->
<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="modelConfig.modelWidth || '30%'"
      destroy-on-close
    >
      <template v-if="hasTable">
        <xh-table
          :listData="innerTable"
          :listCount="count"
          v-bind="modelConfig.tableList"
          v-model:page="pageInfo"
        >
          <template #handle="scope">
            <div class="handle-btn">
              <el-button
                v-if="scope.row.borrowState == 1"
                @click="handleInClick(scope.row)"
                type="success"
                >入库</el-button
              >
              <el-button
                v-else-if="scope.row.borrowState == 0"
                @click="handleOutClick(scope.row)"
                type="primary"
                >出库</el-button
              >
              <el-button
                disabled
                v-else-if="scope.row.borrowState == 2"
                type="primary"
                >禁止修改</el-button
              >
            </div>
          </template>
        </xh-table>
      </template>
      <xh-form v-bind="modelConfig" v-model="formData"></xh-form>
      <!-- <slot name='tableList'></slot> -->

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, nextTick } from 'vue'
import XhForm from '@/base-ui/form'
import XhTable from '@/base-ui/table'
import { userStore } from '@/store'
import {
  dgut_getQcode,
  dgut_applyDetail
} from '@/serve/DgutRequest/dgutRequest'
/* xhfrom的配置 */
export default defineComponent({
  emits: ['materialsInStore', 'materialsOutStore'],
  props: {
    title: {
      type: String,
      default: ''
    },
    modelConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    hasTable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    XhForm,
    XhTable
  },
  setup(props, { emit }) {
    let innerTable: any = ref([])
    let count = ref(0)
    const createTableList = async (item: any) => {
      innerTable.value = (
        await dgut_applyDetail('borrowInfo/get', item.borrowInfoId)
      ).data.detail.materialsInfo

      count.value = innerTable.value.length
      nextTick(() => {
        console.log('innerTable', innerTable)
      })
    }
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const store = userStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
      dialogVisible.value = false
    }
    const handleOutClick = (item: any) => {
      emit('materialsOutStore', {
        ...item,
        borrowInfoId: props.defaultInfo.borrowInfoId,
        number: item.borrowNumber
      })
    }
    const handleInClick = (item: any) => {
      //console.log(item);
      emit('materialsInStore', {
        ...item,
        borrowInfoId: props.defaultInfo.borrowInfoId,
        number: item.borrowNumber
      })
    }
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modelConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`]
        }
      }
    )
    return {
      dialogVisible,
      formData,
      handleConfirmClick,
      innerTable,
      count,
      createTableList,
      handleOutClick,
      handleInClick
    }
  }
})
</script>
<style scoped lang="less"></style>
