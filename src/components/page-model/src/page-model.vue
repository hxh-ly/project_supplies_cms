<!--  -->
<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="modelConfig?.modelWidth || '30%'"
      destroy-on-close
      draggable
    >
      <template v-if="hasTable">
        <xh-table
          :listData="innerTable"
          :listCount="count"
          v-bind="modelConfig?.tableList"
          v-model:page="pageInfo"
        >
          <template #handle="scope">
            <div class="handle-btn">
              <el-button
                v-if="isBorrow && scope.row.borrowState == 1"
                @click="handleInClick(scope.row)"
                type="success"
              >
                入库</el-button
              >
              <el-button
                v-else-if="isReturn && scope.row.borrowState == 0"
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
      <xh-form
        v-bind="modelFilterConfig"
        v-model="formData"
        ref="xhFormRef"
        :rules="modelConfig?.rules"
      ></xh-form>
      <!-- <slot name='tableList'></slot> -->
      <slot></slot>
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
import {
  defineComponent,
  reactive,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  onMounted,
  toRaw,
  computed
} from 'vue'
import XhForm from '@/base-ui/form'
import XhTable from '@/base-ui/table'
import { userStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import {
  dgut_getQcode,
  dgut_applyDetail
} from '@/serve/DgutRequest/dgutRequest'
import { ElMessageBox } from 'element-plus'
import {realValFromName} from '@/util/transData'
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
    },
    requestInfo: {
      type: Object
    },
    listOtherParams: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    XhForm,
    XhTable
  },
  setup(props, { emit }) {
    let that = getCurrentInstance()
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
    let curFormType:any=ref(null)
    const modelFilterConfig = computed(()=>{
     let result = curFormType.value == 'add' ? true : isModified ? false : true
      props.modelConfig?.formItem.forEach((item:any) => item.disable = result)
      return  props.modelConfig
    })
    const handleSelectProp = (e: any) => {
      let queryInfo: any = { ...e }
      for (let i = 0; i < props.modelConfig!.formItem.length; i++) {
        let downSelectObj = props.modelConfig!.formItem[i]
        //如果是下拉
        if (downSelectObj.type == 'select') {
          let field: any = downSelectObj?.field
          if (downSelectObj && field) {
            let eField = toRaw(e[`${field}`])
            let trueVal = null
            //如果是数组 说明下拉是可以多选的
            if (Array.isArray(eField)) {
              //拿到真正值
              let arr: any = []
              downSelectObj?.options?.forEach((item: any) => {
                if (eField.indexOf(item.title) > -1) {
                  arr.push(item.value)
                }
              })
              trueVal = arr
            }
            // 如果是单选
            else {
              trueVal = downSelectObj?.options?.find(
                (item: any) => item.title == e![`${field}`]
              ).value
            }
            queryInfo = { ...queryInfo, [`${field}`]: trueVal }
          }
          console.log(queryInfo)
        }
      }

      return queryInfo
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
    const isModified = usePermission(props.pageName || '', 'update')
    //添加菜单权限
    watch(
      () => props.defaultInfo,
      (newVal: any) => {
        console.log('defaultInfo', newVal)
        for (const item of props.modelConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`]
          //可能是来自搜素 而不是 修改
          //props!.modelConfig!['isDisable'] = !isModified
        }
        if ('password' in formData.value && !formData.value['password']) {
          formData.value['password'] = ''
        }
        console.log(formData.value)
      }
    )
    const confirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        if (isModified && props.requestInfo!.update) {
          store.dispatch('system/editPageDataAction', {
            url: props.requestInfo!.update,
            requestInfo: props.requestInfo,
            pageName: props.pageName,
            editData: { ...props.defaultInfo, ...formData.value },
            listOtherParams: { ...props.listOtherParams }
          })
        }
        //编辑后还要去操作其他接口的
        emit(
          'confirmClick',
          { ...props.defaultInfo, ...formData.value },
          'edit'
        )
      } else {
        if (props.requestInfo?.add) {
          let queryInfo = {...formData.value}
          realValFromName(props.modelConfig,queryInfo)
          store.dispatch('system/createPageDataAction', {
            url: props.requestInfo!.add,
            requestInfo: props.requestInfo,
            pageName: props.pageName,
            newData: {
              ...props.defaultInfo,
              ...queryInfo,
              ...props.otherInfo,
              ...props.listOtherParams
            }
          })
        }
        emit(
          'confirmClick',
          { ...props.defaultInfo, ...formData.value },
          props.modelConfig?.actionType || 'add'
        )
      }

      dialogVisible.value = false
    }
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
      isModified,
      curFormType,
      modelFilterConfig//过滤是否能操作表单
    }
  }
})
</script>
<style scoped lang="less"></style>
