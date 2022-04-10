<!--  -->
<template>
  <div class="page-content">
    <xh-table
      :listData="userList"
      :listCount="userCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @emitSelectionChange="emitSelectionChange"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="default" @click="handleNewClick">新建用户</el-button>
      </template>
      <template #rightPrint>
        <el-button v-if="isPrint" type="primary" size="default" @click="handleToPrint">导出打印</el-button>
      </template>
      <!-- id  -->
      <!-- 选中 -->
      <!-- 操作 -->
      <template #status="scope">
        <slot>
          <el-button
            size="mini"
            :type="scope.row.enable ? 'success' : 'primary'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </slot>
      </template>
      <template #createAt="scope">
        <slot>
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </slot>
      </template>
      <template #updateAt="scope">
        <slot>
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </slot>
      </template>
      <template #handle="scope">
        <div class="handle-btn">
          <el-button
            v-if="isDelete"
            @click="handleDelClick(scope.row)"
            icon="el-icon-remove"
            type="text"
          >删除</el-button>
          <el-button
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            icon="el-icon-edit"
            type="text"
          >编辑</el-button>
          <el-button @click="handleEditClick(scope.row)" icon="el-icon-edit" type="text">详情</el-button>
          <el-button
            v-if="scope.row.borrowState == 0"
            @click="handleCancelClick(scope.row)"
            icon="el-icon-edit"
            type="text"
          >取消申请</el-button>
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
import { defineComponent, computed, ref, watch, reactive, inject,getCurrentInstance } from 'vue'

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
    },
    isDgut: {
      type: Boolean,
      default: false
    },
    isPrint: {
      type: Boolean,
      default: false
    }
  },
  components: {
    XhTable
  },
  emits: ['newBtnClick', 'editBtnClick', 'handlePrint', 'cancelBtnClick'],
  setup(props, { emit }) {
    const store = userStore()
    //1 双向绑定pageInfo  当前页，当前条数
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    let queryInfo:any = inject('queryInfo')
    watch(pageInfo, (newVal) => {
      //console.log('换页', {...queryInfo.value})
      //获取 inject的参数
      getPageData({...queryInfo.value})
    })
    //2 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      //if (!isQuery) return
      if (props.isDgut) {
        store.dispatch('system/getPageListAction', {
          isDgut: true,
          pageName: props.pageName,
          queryInfo: {
            size: pageInfo.value.pageSize,
            current: pageInfo.value.currentPage,
            ...queryInfo
          }
        })
      } else {
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
    }
    //5 拿到权限菜单按钮
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    getPageData()
    //3 vuex中能获取数据
    const userList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const userCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    //console.log('列表数据！！！！！！！！！！！', userList)
    //4 动态获取到propList字段
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName == 'status') return false
        if (item.slotName == 'createAt') return false
        if (item.slotName == 'updateAt') return false
        if (item.slotName == 'handle') return false
        return true
      }
    )
    //console.log('动态字段otherPropSlots', otherPropSlots)
    // 5 删除 | 创建 |更新
    const handleDelClick = (item: any) => {
      console.log(item)
      store.dispatch('system/deletePageData', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    const handleCancelClick = (item: any) => {
      emit('cancelBtnClick', item)
    }
    const selectPrintItem = ref([])
    /*   watch(()=>[selectPrintItem.value],(newVal)=>{
      console.log('是否监听到改变selectPrintItem',newVal);
    }) */
    const emitSelectionChange = (v: any) => {
      selectPrintItem.value = v
    }
    const handleToPrint = () => {
      emit('handlePrint', selectPrintItem.value)
    }
    return {
      userList,
      userCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      //权限相关
      isCreate,
      isUpdate,
      isDelete,
      //操作相关
      handleDelClick,
      handleNewClick,
      handleEditClick,
      handleCancelClick,
      //导出打印相关
      emitSelectionChange,
      handleToPrint,
      selectPrintItem
    }
  }
})
</script>
<style scoped lang="less"></style>
