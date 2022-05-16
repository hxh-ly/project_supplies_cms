<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfigRef" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick" @changeQueryInfo="handleChangeQueryInfo" />
    <page-content ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="borrowInfo"
      @newBtnClick="handleNewData" @editBtnClick="handleEditData" @cancelBtnClick="handleSwitchState" :isDgut="true"
      :requestInfo="requestInfo">
      <template #gmtStart="scope">{{
          $filters.formatTime(scope.row.gmtStart)
      }}</template>
      <template #gmtEnd="scope">{{
          $filters.formatTime(scope.row.gmtEnd)
      }}</template>
      <template #userInfo="scope">
        {{ scope.row.userInfo?.account || 0 }}
      </template>
      <template #userId="scope">{{ scope.row.userId || 0 }}</template>
    </page-content>
    <page-model ref="pageModalRef" fnType="edit" pageName="borrowInfo" :modelConfig="modelFormConfigRef"
      @materialsInStore="handleInStore" @materialsOutStore="handleOutStore" :defaultInfo="defaultInfo" :hasTable="true"
      :requestInfo="requestInfo">
      <template #tableList>
        <!--  <xh-table
          :listData="materialsInfo"
          :listCount="materialsInfo.length"
          v-bind="modelFormConfigRef.tableList"
          v-model:page="pageInfo"
        >
        </xh-table>-->
      </template>
    </page-model>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  provide,
  getCurrentInstance
} from 'vue'
import { userStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelFormConfig } from './config/model.config'
import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'
import pageModel from '@/components/page-model'
import { usePageSearch } from '@/hooks/use-page-config'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  dgut_getQcode,
  dgut_applyDetail,
  dgut_cancelBorrow,
  dgut_materialReturn,
  dgut_materialBorrow
} from '@/serve/DgutRequest/dgutRequest'
import { ElMessage } from 'element-plus'
import { handleWorkRequest } from '@/util/handleRequest'
import { log } from 'console'
export default defineComponent({
  name: 'borrowMaterial',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
    /*1 页面自己的逻辑：添加显示哪些列表项 编辑显示哪些列表项 */
    let materialsInfo = reactive([])
    let queryInfo = ref({})
    provide('queryInfo', queryInfo)
    let count = ref(0)
    const addDataFn = () => {
      var obj = modelFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      obj!.isHidden = false
    }
    // console.log('当前实例', getCurrentInstance())
    const editDataFn = async (item: any) => {
      //请求详情数据
      return (await dgut_applyDetail(undefined, item.borrowInfoId)).data.detail
        .materialsInfo
    }
    //2 动态添加借用单的状态
    const searchFormConfigRef = computed(() => {
      const store = userStore()
      let formItemBorrowState = searchFormConfig.formItem.find(
        (item: any) => item.field == 'borrowState'
      )
      formItemBorrowState!.options = store.state.entriesBorrowState.map(
        (item: any) => {
          return {
            title: item.info,
            value: item.code
          }
        }
      )
      return searchFormConfig
    })
    const modelFormConfigRef = computed(() => {
      return modelFormConfig
    })

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleSwitchState = (data: any) => {
      //发出请求修改状态
      // console.log('我要取消了', data.borrowInfoId)
      handleWorkRequest(
        () => dgut_cancelBorrow(undefined, data.borrowInfoId),
        () => {
          console.log('我要取消')
        }
      )
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editDataFn)
    const handleInStore = (item: any) => {
      //console.log('入库', item)
      handleWorkRequest(
        () => dgut_materialReturn(undefined, item),
        () => {
          ; (pageModalRef as any).value.dialogVisible = false
        }
      )
    }
    const handleOutStore = (item: any) => {
      // console.log('出库', item)
      handleWorkRequest(
        () => dgut_materialBorrow(undefined, item),
        () => {
          ; (pageModalRef as any).value.dialogVisible = false
        }
      )
    }

    const handleChangeQueryInfo = (v: any) => {
      queryInfo.value = v
    }
    const requestInfo = {
      get: '/borrowInfo/list'
    }
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,

      modelFormConfigRef,
      //查询框项配置
      searchFormConfigRef,
      //弹窗
      pageModalRef,
      //操作相关
      handleNewData,
      handleEditData,
      handleSwitchState,
      defaultInfo,

      materialsInfo,
      count,

      //详情里的操作
      handleInStore,
      handleOutStore,
      queryInfo,
      handleChangeQueryInfo,
      requestInfo
    }
  }
})
</script>

<style scoped>
aa {
  color: rgb(60, 182, 219);
}
</style>
