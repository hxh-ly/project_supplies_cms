<template>
  <div class="user">
    <!--     <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="borrowInfo"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      :isDgut="true"
    >
      <template #userInfo="scope">{{
        '¥' + (scope.row.userInfo?.account || 0)
      }}</template>
    </page-content>
    <!--     <page-model
      ref="pageModalRef"
      pageName="material"
      :modelConfig="modelFormConfigRef"
      :defaultInfo="defaultInfo"
    ></page-model> -->
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
export default defineComponent({
  name: 'infoMaterial',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
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
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
