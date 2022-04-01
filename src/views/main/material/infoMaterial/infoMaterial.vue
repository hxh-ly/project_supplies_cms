<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
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
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.photo ? BASE_IMG_URL + scope.row.photo : ''"
          :preview-src-list="[scope.row.photo]"
        >
        </el-image>
      </template>
      <template #unitPrice="scope">{{
        '¥' + (scope.row.unitPrice || 0)
      }}</template>
      <template #gmtWarehoused="scope">
        <slot
          ><span>{{ $filters.formatTime(scope.row.gmtWarehoused) }}</span></slot
        >
      </template>
      <template #gmtBought="scope">
        <slot
          ><span>{{ $filters.formatTime(scope.row.gmtBought) }}</span></slot
        >
      </template>
    </page-content>
    <page-model
      ref="pageModalRef"
      pageName="material"
      :modelConfig="modelFormConfigRef"
      :defaultInfo="defaultInfo"
    ></page-model>
    <page-imgprint ref="pageImgRef" class="page-print-model"> </page-imgprint>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { userStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelFormConfig } from './config/model.config'
import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'
import pageModel from '@/components/page-model'
import { usePageSearch } from '@/hooks/use-page-config'
import { usePageModal } from '@/hooks/use-page-modal'
import { dgut_getQcode, getMultiQRcode } from '@/serve/DgutRequest/dgutRequest'
import { downLoadZip, downImgToPdf } from '@/util/fileSave'
import { ElMessage } from 'element-plus'
import PageImgprint from '@/components/page-imgprint/src/page-imgprint.vue'
import { BASE_IMG_URL } from '@/const/constAttr'
export default defineComponent({
  name: 'infoMaterial',
  components: {
    pageContent,
    pageSearch,
    pageModel,
    PageImgprint
  },
  setup() {
    dgut_getQcode('/code', 'ylhao').then((res) => {
      console.log('图片接口', res)
    })
    /*1 页面自己的逻辑：添加显示哪些列表项 编辑显示哪些列表项 */
    const addDataFn = () => {
      var obj = modelFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      obj!.isHidden = false
    }
    const editDataFn = () => {
      var obj = modelFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      obj!.isHidden = true
    }
    //2 动态添加部门和角色列表
    const modelFormConfigRef = computed(() => {
      const store = userStore()
      return modelFormConfig
    })

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

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
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,

      modelFormConfigRef,

      //弹窗
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      BASE_IMG_URL,
      //导出打印
      handlePrint,
      pageImgRef
    }
  }
})
</script>

<style scoped>
.page-print {
  visibility: hidden;
}
</style>
