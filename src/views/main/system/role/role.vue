<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModalRef"
      pageName="role"
      :modelConfig="modelFormConfig"
      :defaultInfo="defaultInfo"
      :other-info="otherInfo"
    >
      <div class="tree-panel">
        <el-tree
          ref="elTreeRef"
          :data="menu"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, nextTick } from 'vue'
import { userStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelFormConfig } from './config/model.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-config'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/util/map-menu'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'users',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
    const store = userStore()
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    //传入hook里的待回显的tree处理
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      undefined,
      editCallback
    )

    console.log(store.state.entriesMenu)
    /* 请求角色数据 */
    const menu = computed(() => {
      return store.state.entriesMenu
    })
    const handleCheckChange = (data1: any, data2: any) => {
      //选中树item
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    /*  const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    } */

    const otherInfo = ref({})
    return {
      searchFormConfig,
      contentTableConfig,
      modelFormConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,

      menu,
      handleCheckChange,
      otherInfo, //需要合并formData的树的数组
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
