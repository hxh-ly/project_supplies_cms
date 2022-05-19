<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      @changeQueryInfo="handleChangeQueryInfo"
      ref="pageSearchRef"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="material"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @handlePrint="handlePrint"
      :isDgut="true"
      :isPrint="true"
      :requestInfo="requestInfo"
      :allPermissionBtn="allPermissionBtn"
      :queryCb="queryCb"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.photo ? BASE_IMG_URL + scope.row.photo : ''"
          :preview-src-list="[scope.row.photo]"
        ></el-image>
      </template>
      <template #unitPrice="scope">
        {{ '¥' + (scope.row.unitPrice || 0) }}
      </template>
      <template #gmtWarehoused="scope">
        <slot>
          <span>{{ $filters.formatTime(scope.row.gmtWarehoused) }}</span>
        </slot>
      </template>
      <template #gmtBought="scope">
        <slot>
          <span>{{ $filters.formatTime(scope.row.gmtBought) }}</span>
        </slot>
      </template>
    </page-content>
    <page-model
      ref="pageModalRef"
      pageName="material"
      :modelConfig="modelFormConfigRef"
      :defaultInfo="defaultInfo"
      :requestInfo="requestInfo"
      @confirmClick="handleConfirmClick"
    ></page-model>
    <page-imgprint ref="pageImgRef" class="page-print-model"></page-imgprint>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, provide } from 'vue'
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
  getMultiQRcode,
  dgut_updateMaterialBaseInfo
} from '@/serve/DgutRequest/dgutRequest'
import { downLoadZip, downImgToPdf } from '@/util/fileSave'
import { ElMessage } from 'element-plus'
import PageImgprint from '@/components/page-imgprint/src/page-imgprint.vue'
import { BASE_IMG_URL } from '@/const/constAttr'
import { handleWorkRequest } from '@/util/handleRequest'
import formatUtcString from '@/util/date-format'
import { getMaterialDetail } from '@/serve/DgutRequest/material'
import { realValFromName } from '@/util/transData'
import {normalRequest} from '@/serve'
export default defineComponent({
  name: 'infoMaterial',
  components: {
    pageContent,
    pageSearch,
    pageModel,
    PageImgprint
  },
  setup() {
    const allPermissionBtn = reactive([
      { title: 'isUpdate', name: '修改', flag: 'update' },
      { title: 'isQuery', name: '查询', flag: 'query' },
      { title: 'isPrint', name: '导出打印', flag: 'print' }
    ])
    const pageSearchRef=ref(null)
    let queryInfo = ref({})
    provide('queryInfo', queryInfo)
    /*1 页面自己的逻辑：添加显示哪些列表项 编辑显示哪些列表项 */
    const addDataFn = () => {
      var obj = modelFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      obj!.isHidden = false
    }
    const editDataFn = (item: any) => {
      console.log(item)
      var obj = modelFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      obj!.isHidden = true
    }
    //2 动态添加部门和角色列表
    const modelFormConfigRef = computed(() => {
      return modelFormConfig
      /* cur?.options= [...]
      return modelFormConfig */
    })
    const searchFormRef = computed(() => {
      const store = userStore()
      let cur: any = searchFormConfig.formItem.find(
        (item: any) => item.type == 'select' && item.options.length == 0
      )
      //console.log(store.state.entriesDepartment);
      if (cur) {
        let trulyOptions = store.state.entriesDepartment.map(
          (options_item: any) => ({
            title: options_item.name,
            value: options_item.name,
            realVal: options_item.projectTeamId
          })
        )
        cur[`options`] = trulyOptions
      }
      return searchFormConfig
    })
    const editCallFn = (item: any, defaultInfo: any) => {
      console.log(item)
      const { materialId } = item
      if (materialId) {
        // getMaterialDetail(materialId).then((res) => {
        //   console.log('获取详情')
        // })
      }
      console.log(defaultInfo)
      defaultInfo.value = {
        ...defaultInfo.value,
        type: defaultInfo.value.typeInfo,
        photo:defaultInfo.value.photo? BASE_IMG_URL+defaultInfo.value.photo:''
      }
      //动态请求物资详情
    }
    const queryCb = (formData: any) => {
      let queryParams = { ...formData }
      realValFromName(searchFormConfig, queryParams)
      queryParams.projectTeamIds = queryParams.projectTeamIds.join(',')
      //这里有要改掉时间的操作
      if(queryParams['gmtWarehoused']) {
         queryParams['startWarehoused'] = formatUtcString(queryParams['gmtWarehoused'][0])
         queryParams['endWarehoused'] = formatUtcString(queryParams['gmtWarehoused'][1])
         delete queryParams['gmtWarehoused']
      }
      if( queryParams['gmtBought']) {
         queryParams['startBought'] = formatUtcString(queryParams['gmtBought'][0])
         queryParams['endBought'] = formatUtcString(queryParams['gmtBought'][1])
         delete queryParams['gmtBought']
      }
      return queryParams
    }
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch(queryCb)

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallFn)

    //导出打印
    const pageImgRef = ref<InstanceType<typeof PageImgprint>>()
    const handlePrint = async (selectPrintItem: any) => {
      /*   if (pageImgRef.value) {
        pageImgRef.value.dialogVisible = true
      } */
      console.log('数据发到这里selectPrintItemi', selectPrintItem)
      if (!selectPrintItem || selectPrintItem.length == 0) {
        ElMessage({
          message: '请勾选要导出的物资二维码~~~~',
          type: 'warning',
          duration: 1400
        })
        return
      } else {
        const idList = selectPrintItem.map((item: any) => ({
          fileName: item.name,
          materialId: item.materialId
        }))
        try {
          let QRcodeDataList = await getMultiQRcode(undefined, idList)
          let fileDownList = idList.map((item: any, index: number) => ({
            ...item,
            url: QRcodeDataList[index]
          }))
          //console.log(QRcodeDataList)
          //console.log(fileDownList)
          //downLoadZip(fileDownList)
          downImgToPdf(fileDownList)
        } catch (error) {
          console.log(error)
        }
      }
    }
    const getSelectIdByName = (idArr: any, title: any) => {
      let res: any = null
      res = idArr.find((item: any) => item.title == title).value
      return res
    }

    const handleChangeQueryInfo = (v: any) => {
      queryInfo.value = v
    }
    const checkNumber = (val: any) => {
      return parseFloat(val).toString() == 'NaN'
    }
    const handleConfirmClick = async (v: any, type: any) => {
      if (type == 'edit') {
        var updateInfo = {
          ...v,
          type: !checkNumber(v.type)
            ? v.type
            : getSelectIdByName(
                modelFormConfigRef.value.formItem.find(
                  (v: any) => v.field == 'type'
                )?.options,
                v.type
              ),
          gmtBought: formatUtcString(v.gmtBought),
          gmtWarehoused: formatUtcString(v.gmtWarehoused)
        }
        //debugger
        await handleWorkRequest(
          () => normalRequest('/material/modify', 'put',updateInfo),
          () => {
            updateInfo = null
          }
        )
        ;(pageContentRef as any).value?.getPageData()
      }
    }
    const requestInfo = {
      get: '/material/list',
      update: '',
      add: ''
    }
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleChangeQueryInfo,
      handleConfirmClick,
      modelFormConfigRef,
      searchFormRef,
      //弹窗
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      BASE_IMG_URL,
      //导出打印
      allPermissionBtn,
      handlePrint,
      pageImgRef,
      queryInfo,
      requestInfo,
      pageSearchRef,
      queryCb
    }
  }
})
</script>

<style scoped>
.page-print {
  visibility: hidden;
}
</style>
