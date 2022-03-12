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
      :isDgut="true"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.photo"
          :preview-src-list="[scope.row.photo]"
        >
        </el-image>
      </template>
      <template #unitPrice="scope">{{ '¥' + (scope.row.unitPrice||0) }}</template>
   <!--    <template #dguthandle="scope">
          <div class="handle-btn">
          <el-button
            v-if="isDelete"
            @click="handleDelClick(scope.row)"
            icon="el-icon-remove"
            type="text"
            >删除</el-button
          >
          <el-button
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            icon="el-icon-edit"
            type="text"
            >编辑</el-button
          >
        </div>
      </template> -->
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'
import { usePageSearch } from '@/hooks/use-page-config'
export default defineComponent({
  name: 'infoMaterial',
  components: {
    pageContent,
    pageSearch
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
