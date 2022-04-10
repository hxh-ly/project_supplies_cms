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
                v-if="isBorrow && scope.row.borrowState == 1"
                @click="handleInClick(scope.row)"
                type="success"
              >入库</el-button>
              <el-button
                v-else-if="isReturn && scope.row.borrowState == 0"
                @click="handleOutClick(scope.row)"
                type="primary"
              >出库</el-button>
              <el-button disabled v-else-if="scope.row.borrowState == 2" type="primary">禁止修改</el-button>
            </div>
          </template>
        </xh-table>
      </template>
      <xh-form v-bind="modelConfig" v-model="formData"></xh-form>
      <!-- <slot name='tableList'></slot> -->

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
import { defineComponent, reactive, ref, watch, nextTick } from 'vue'
import XhForm from '@/base-ui/form'
import XhTable from '@/base-ui/table'
import { userStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import {
  dgut_getQcode,
  dgut_applyDetail
} from '@/serve/DgutRequest/dgutRequest'
import { ElMessageBox } from 'element-plus'

/* xhfrom的配置 */
export default defineComponent({
  emits: ['materialsInStore', 'materialsOutStore', 'confirmClick'],
  props: {
    fnType: {
      type: String,
      default: ''
    },
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
    const confirmClick = () => {
      if (isModified) {
        ElMessageBox.confirm('确认修改?')
          .then(() => {
            //可复用性不高
           emit('confirmClick', {...props.defaultInfo, ...formData.value })
          })
          .catch(() => {
            // catch error
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
    const isBorrow = usePermission(props.pageName || '', 'material:borrow')
    const isReturn = usePermission(props.pageName || '', 'material:return')
    const isModified = usePermission(props.pageName || '', 'modify')
    watch(
      () => props.defaultInfo,
      (newVal: any) => {
        for (const item of props.modelConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`]
          //可能是来自搜素 而不是 修改

          props!!.modelConfig!!['isDisable'] = !isModified
        }
      }
    )

    return {
      dialogVisible,
      formData,
      confirmClick,
      innerTable,
      count,
      createTableList,
      handleOutClick,
      handleInClick,
      isBorrow,
      isReturn,
      isModified
    }
  }
})
</script>
<style scoped lang="less"></style>
