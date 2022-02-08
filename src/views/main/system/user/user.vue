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
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModalRef"
      pageName="users"
      :modelConfig="modelFormConfigRef"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelFormConfig } from './config/model.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'
import { userStore } from '@/store'
import { usePageSearch } from '@/hooks/use-page-config'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'users',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
    /*1 页面自己的逻辑：添加显示哪些列表项 编辑显示哪些列表项 */
    const addDataFn = () => {
      var obj = modelFormConfig.formItem.find((item) => item.field === 'password')
      obj!.isHidden = false
    }
    const editDataFn = () => {
      var obj = modelFormConfig.formItem.find((item) => item.field === 'password')
      obj!.isHidden = true
    }
    //2 动态添加部门和角色列表
    const modelFormConfigRef = computed(() => {
      const store = userStore()
      const departMentItem = modelFormConfig.formItem.find((item) => item.field === 'departmentId')
      departMentItem!.options = store.state.entriesDepartment.map((item) => ({
        title: item.name,
        value: item.id
      }))
      const roleItem = modelFormConfig.formItem.find((item) => item.field === 'roleId')
      roleItem!.options = store.state.entriesRole.map((item) => ({
        title: item.name,
        value: item.id
      }))
      return modelFormConfig
    })

    //3 获取公共变量和函数
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      addDataFn,
      editDataFn
    )
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,

      modelFormConfigRef,

      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
