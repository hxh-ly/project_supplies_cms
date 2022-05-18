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
        <el-button
          v-if="checkIsShow('isAdd') != null"
          type="primary"
          size="default"
          @click="handleNewClick"
          >{{ checkIsShow('isAdd').name }}
        </el-button>
        <el-button
          v-if="checkIsShow('isAddMenu') != null"
          type="primary"
          size="default"
          @click="handleNewClick('add_menu')"
          >{{ checkIsShow('isAddMenu').name }}
        </el-button>
      </template>
      <template #rightPrint>
        <el-button
          v-if="checkIsShow('isPrint') != null"
          type="primary"
          size="default"
          @click="handleToPrint"
          >{{ checkIsShow('isPrint').name }}</el-button
        >
      </template>
      <!-- id  -->
      <!-- 选中 -->
      <!-- 操作 -->
      <template #status="scope">
        <slot>
          <el-button
            size="mini"
            :type="scope.row.enable ? 'success' : 'primary'"
            >{{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
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
            v-if="checkIsShow('isDelete')"
            @click="handleDelClick(scope.row)"
            icon="el-icon-remove"
            type="text"
            >删除</el-button
          >
          <el-button
            v-if="checkIsShow('isUpdate')"
            @click="handleEditClick({ ...scope.row })"
            icon="el-icon-edit"
            type="text"
          >
            编辑</el-button
          >
          <el-button
            v-if="!checkIsShow('isUpdate')"
            @click="handleEditClick(scope.row)"
            icon="el-icon-edit"
            type="text"
            >详情</el-button
          >
          <!-- 自定义权限的添加 -->
          <el-button
            v-if="checkIsShow('isAddPage') && scope.row.level == 1"
            @click="handleNewClick('add_page', scope.row)"
            icon="el-icon-remove"
            type="text"
            >{{ checkIsShow('isAddPage').name }}</el-button
          >
          <el-button
            v-if="checkIsShow('isAddPre') && scope.row.level == 2"
            @click="handleNewClick('add_permission', scope.row)"
            icon="el-icon-remove"
            type="text"
            >{{ checkIsShow('isAddPre').name }}</el-button
          >
          <el-button
            v-if="scope.row.borrowState == 0"
            @click="handleCancelClick(scope.row)"
            icon="el-icon-edit"
            type="text"
            >取消申请</el-button
          >
        </div>
      </template>
      <!-- 这部分的动态配置出来的 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xh-table>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  reactive,
  inject,
  getCurrentInstance,
  toRefs
} from 'vue'

import XhTable from '@/base-ui/table'
import { userStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import { request } from 'http'
import { ElMessageBox } from 'element-plus'
const path = require('path')
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
    },
    urlPre: {
      type: String,
      default: ''
    },
    listOtherParams: {
      type: Object,
      default: null
    },
    requestInfo: {
      type: Object
    },
    allPermissionBtn: {
      type: Array
    }
  },
  components: {
    XhTable,
    ElMessageBox
  },
  emits: ['newBtnClick', 'editBtnClick', 'handlePrint', 'cancelBtnClick'],
  setup(props, { emit }) {
    const store = userStore()
    //1 双向绑定pageInfo  当前页，当前条数
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    let queryInfo: any = inject('queryInfo')

    watch(pageInfo, (newVal) => {
      //debugger
      //console.log('换页', {...queryInfo.value})
      //获取 inject的参数
      getPageData({ ...newVal })
    })
    //2 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (props.isDgut) {
        store.dispatch('system/getPageListAction', {
          isDgut: true,
          pageName: props.pageName,
          url: props!.requestInfo?.get,
          queryInfo: Object.assign(
            {
              size: pageInfo.value.pageSize,
              current: pageInfo.value.currentPage,
              paginated:true
            },
            queryInfo,
            props.listOtherParams
          )
        })
      }
    }
    const getAllPermissionBtn = (allExt: any = []) => {
      return allExt.map((item: any = {}) => {
        return { ...item, show: usePermission(props.pageName, item?.flag) }
      })
    }
    const allBtnShowLists = ref(getAllPermissionBtn(props.allPermissionBtn))
    const checkIsShow = (name: any, arr: any = allBtnShowLists.value) => {
      return arr.find((item: any) => name == item.title)
    }
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
    // console.log('动态字段otherPropSlots', otherPropSlots)
    // 5 删除 | 创建 |更新
    const handleDelClick = (item: any) => {
      ElMessageBox.confirm('确定删除吗')
        .then(() => {
          console.log(item)
          let id = item[`${props.pageName}Id`]
          if (props.requestInfo?.delete) {
            store.dispatch('system/deletePageData', {
              url: path.resolve(props.requestInfo?.delete, id),
              pageName: props.pageName,
              requestInfo: props.requestInfo,
              listOtherParams: props.listOtherParams
            })
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
    const handleNewClick = (type: any, item: any) => {
      emit('newBtnClick', type, item)
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
      //操作相关
      handleDelClick,
      handleNewClick,
      handleEditClick,
      handleCancelClick,
      //导出打印相关
      emitSelectionChange,
      handleToPrint,
      selectPrintItem,
      // ...toRefs(getAllPermissionBtn(props.allPermissionBtn))
      allBtnShowLists,
      checkIsShow
    }
  }
})
</script>
<style scoped lang="less"></style>
