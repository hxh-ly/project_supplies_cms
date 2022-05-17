<template>
  <div class="user">
    <page-content
      :contentTableConfig="contentTableConfig"
      :isDgut="true"
      :requestInfo="requestInfo"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      :allPermissionBtn="allPermissionBtn"
    ></page-content>
    <page-model
      ref="pageModalRef"
      pageName="role"
      :modelConfig="modelFormConfig"
      :defaultInfo="defaultInfo"
      :requestInfo="requestInfo"
      :other-info="otherInfo"
      @confirmClick="handleConfirm"
    >
      <template #default>
        <div class="tree-panel">
          <el-tree
            ref="elTreeRef"
            :data="menu"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="{ children: 'children', label: 'label' }"
            @check="handleCheckChange"
          />
        </div>
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
  nextTick,
  onMounted,
  watch
} from 'vue'
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
import { addRole } from '@/serve/DgutRequest/role/index'
import { handleWorkRequest } from '@/util/handleRequest'
import { getPageListData } from '@/serve/main/system/system'
import {
  getAuthMenuList,
  updateRolePermissions
} from '@/serve/DgutRequest/menu/index'
export default defineComponent({
  name: 'users',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
    const requestInfo = {
      update: '/auth/role/update',
      get: 'auth/role/list',
      add: '/auth/role/add',
      delete: '/auth/role/delete/'
    }
    const allPermissionBtn = reactive([
      { title: 'isAdd', name: '添加', flag: 'add' },
      { title: 'isDelete', name: '删除', flag: 'delete' },
      { title: 'isUpdate', name: '修改', flag: 'update' },
      { title: 'isQuery', name: '查询', flag: 'query' }
    ])
    let menu: any = ref({})
    let defaultKey: any = ref([])
    let checkKeys: any = ref(null)
    const store = userStore()
    let otherInfo = ref({})
    /*    watch(defaultKey,(newVal:any,oldVal:any)=>{
           console.log('defaultKey',newVal);
           console.log('defaultKey oldVal',oldVal);
           console.log('current',defaultKey);


       }) */
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // menu = computed(() => {
    //   return store.state.entriesPermissions
    // })
    //传入hook里的待回显的tree处理
    const editCallback = (item: any) => {
      defaultKey.value = []
      getAuthMenuList(undefined, {
        paginated: false,
        treed: true,
        roleId: item.roleId
      }).then((res) => {
        console.log('点击再去请求', res)
        const { tree, rolePermissions } = res.data
        defaultKey.value = [...rolePermissions]
        menu.value = tree
        nextTick(() => {
          console.log('请求后立即修改视图', defaultKey.value)
          elTreeRef.value?.setCheckedKeys(defaultKey.value, false)
        })
      })
      /*    const leafKeys = menuMapLeafKeys(item.menuList)
         nextTick(() => {
           console.log(elTreeRef.value)
           elTreeRef.value?.setCheckedKeys(leafKeys, false)
         }) */
    }
    const addCallback = (item: any) => {
      defaultKey.value = []
    }
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(addCallback, editCallback)
    const handleConfirm = async (e: any, type: any) => {
      if (type == 'edit') {
        let { roleId } = e
        let queryInfo = { roleId, permissionIds: [...checkKeys.value] }
        await handleWorkRequest(
          () => updateRolePermissions(undefined, queryInfo),
          (res: any) => {
            console.log(res)
          }
        )
        //await handleWorkRequest(() => addRole(undefined, queryInfo), (res: any) => { console.log(res) })
      } else if (type == 'add') {
        //await handleWorkRequest(() => addRole(undefined, queryInfo), (res: any) => { console.log(res) })
        //添加的东西是啥？
        let newData = { ...e }
        console.log(newData)

        /*  store.dispatch('system/createPageDataAction', {
           urlPre: 'auth',
           newData: newData,
           pageName: "role",
         }) */
      }
    }
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      checkKeys.value = menuList
      otherInfo.value = { permissionIds: menuList }
    }
    /*  const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    } */

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
      menu, //所有的权限&菜单
      defaultKey, //已经选中的
      checkKeys, //正在编辑的树状权限
      handleCheckChange,
      handleConfirm, //添加或编辑的确认
      otherInfo, //需要合并formData的树的数组
      elTreeRef, // 组件实例ref
      requestInfo, // role有关的url
      allPermissionBtn //权限传入
    }
  }
})
</script>

<style scoped></style>
