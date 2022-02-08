<!--  -->
<template>
  <div class="page-content">
    <xh-table
      :listData="userList"
      :listCount="userCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="medium" @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- id  -->
      <!-- 选中 -->
      <!-- 操作 -->
      <template #status="scope">
        <slot
          ><el-button size="mini" :type="scope.row.enable ? 'success' : 'primary'">{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button></slot
        >
      </template>
      <template #createAt="scope">
        <slot
          ><span>{{ $filters.formatTime(scope.row.createAt) }}</span></slot
        >
      </template>
      <template #updateAt="scope">
        <slot
          ><span>{{ $filters.formatTime(scope.row.update) }}</span></slot
        >
      </template>
      <template #handle="scope">
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
      </template>
      <!-- 这部分的动态配置出来的 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xh-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import XhTable from '@/base-ui/table'
import { userStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    XhTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = userStore()
    //1 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, (newVal) => {
      getPageData()
    })
    //2 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        /* pageUrl: '/users/list', */
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    //5 拿到权限菜单按钮
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    getPageData()
    //3 vuex中能获取数据
    const userList = computed(() => store.getters['system/pageListData'](props.pageName))
    const userCount = computed(() => store.getters['system/pageListCount'](props.pageName))

    //4 动态获取到propList字段
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (item.slotName == 'status') return false
      if (item.slotName == 'createAt') return false
      if (item.slotName == 'updateAt') return false
      if (item.slotName == 'handle') return false
      return true
    })
    console.log('动态字段otherPropSlots', otherPropSlots)
    //console.log('%c userCount', 'color:red', userCount.value)
    //console.log('%c userCount', 'color:red', userList.value)
    // 5 删除 | 创建 |更新
    const handleDelClick = (item: any) => {
      console.log(item)
      store.dispatch('system/deletePageData', { pageName: props.pageName, id: item.id })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      userList,
      userCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDelClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>
<style scoped lang="less"></style>
