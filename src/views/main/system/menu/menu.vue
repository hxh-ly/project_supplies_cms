<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      isDgut="true"
      pageName="permission"
      urlPre="/auth"
      :requestInfo="requestInfo"
      :listOtherParams="{ paginated: false, treed: true }"
      :allPermissionBtn="allPermissionBtn"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <!-- <template #level="scope">{{
          scope.row.level == 1 || scope.row.level == 2 ? `${scope.row.level}级菜单` : '权限'
      }}</template> -->
    </page-content>
    <page-model
      ref="pageModalRef"
      pageName="permission"
      :modelConfig="SwitchModelConfig"
      :defaultInfo="defaultInfo"
      :requestInfo="requestInfo"
      @confirmClick="handleConfirm"
      :listOtherParams="{ paginated: false, treed: true }"
    >
    </page-model>
  </div>
</template>

<script lang="ts">
const path = require('path')
import { defineComponent, computed, ref, reactive, onMounted } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
/* import pageSearch from '@/components/page-search' */
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'
import {
  getAuthMenuList,
  addMenuRequest,
  addPageRequest,
  addPermissionRequest,
  updateMenuAllReq
} from '@/serve/DgutRequest/menu/index'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  menuViewConfig,
  pageViewConfig,
  permissionViewConfig
} from './config/modal/Viewconfig'
import { handleWorkRequest } from '@/util/handleRequest'
export default defineComponent({
  name: 'xh-menu',
  components: {
    /* pageSearch, */
    pageContent,
    pageModel
  },
  setup() {
    const requestInfo = {
      update: '/auth/permission/update',
      get: '/auth/permission/list',
      delete: '/auth/permission/delete/',
      addMenu: '/auth/permission/addMenu',
      addPage: '/auth/permission/addPage',
      addPermission: '/auth/permission/addPermission'
    }
    const allPermissionBtn = reactive([
      { title: 'isAddMenu', name: '添加菜单', flag: 'addMenu' },
      { title: 'isAddPage', name: '添加页面', flag: 'addPage' },
      { title: 'isAddPre', name: '添加权限', flag: 'addPermission' },
      { title: 'isDelete', name: '删除', flag: 'delete' },
      { title: 'isUpdate', name: '修改', flag: 'update' }
    ])
    const parentId = ref('')
    const parentUrlPre = ref('')
    const SwitchModelConfig: any = ref(menuViewConfig)
    const pageModalRef: any = ref(null)
    const pageContentRef: any = ref(null)
    const defaultInfo = ref({})
    const handleNewData = (type: any, item: any) => {
      defaultInfo.value = {}
      parentId.value = item?.permissionId || ''
      parentUrlPre.value = item?.pagePath || ''
      console.log('打印出parentId', parentUrlPre.value)
      switch (type) {
        case 'add_menu':
          SwitchModelConfig.value = menuViewConfig
          break
        case 'add_page':
          SwitchModelConfig.value = pageViewConfig
          break
        case 'add_permission':
          SwitchModelConfig.value = permissionViewConfig
          break
      }
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }

    const handleEditData = (item: any) => {
      //console.log(type);
      console.log(item)
      defaultInfo.value = { ...item }
      //defaultInfo.value =
       switch (item.level) {
        case 1:
          SwitchModelConfig.value = menuViewConfig
          break
        case 2:
          SwitchModelConfig.value = pageViewConfig
          break
        case 3:
          SwitchModelConfig.value = permissionViewConfig
          break
      }
      if (pageModalRef.value) {
        // pageModalRef.value.totalInfoItem = { ...item }
        pageModalRef.value.dialogVisible = true
      }
    }
    const interceptPath = (pagePath: any) => {
      return path.resolve(parentUrlPre.value, pagePath)
    }
    const handleConfirm = (data: any, type: any) => {
      //如何找出父级id
      //默认给给sortId
      //pathPath需要拦截
      let sort = Math.ceil(Math.random() * 100)
      let requestParams = { ...data, sort, parentId: parentId.value }
      if ('pagePath' in requestParams) {
        requestParams['pagePath'] = interceptPath(requestParams['pagePath'])
        console.log(requestParams)
      }
      if (type.startsWith('add')) {
        switch (type) {
          case 'addMenu':
            handleWorkRequest(
              () => addMenuRequest(undefined, { ...requestParams }),
              (res: any) => {
                pageContentRef?.value.getPageData()
              }
            )
            break
          case 'addPage':
            handleWorkRequest(
              () => addPageRequest(undefined, { ...requestParams }),
              (res: any) => {
                pageContentRef?.value.getPageData()
              }
            )
            break
          case 'addPermission':
            handleWorkRequest(
              () => addPermissionRequest(undefined, { ...requestParams }),
              (res: any) => {
                pageContentRef?.value.getPageData()
              }
            )
            break
        }
      } else if (type.startsWith('edit')) {
        console.log('编辑需要的回显', data)
        //handleWorkRequest(() =>  updateMenuAllReq(undefined,{...requestParams }), (res: any) => { pageContentRef?.value.getPageData() });
        // switch (type) {
        //   case 'addMenu': handleWorkRequest(() => addMenuRequest(undefined, { ...requestParams }), (res: any) => { pageContentRef?.value.getPageData() }); break;
        //   case 'addPage': handleWorkRequest(() => addPageRequest(undefined, { ...requestParams }), (res: any) => { pageContentRef?.value.getPageData() }); break;
        //   case 'addPermission': handleWorkRequest(() => addPermissionRequest(undefined, { ...requestParams }), (res: any) => { pageContentRef?.value.getPageData() }); break;
        // }
      }
    }
    // const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal()
    onMounted(() => {
      /* getAuthMenuList(undefined, { paginated: false, treed: true }).then(res => {
        console.log('....', res);
      }) */
    })
    return {
      contentTableConfig,
      allPermissionBtn,
      requestInfo,
      SwitchModelConfig,
      defaultInfo,
      pageModalRef,
      handleNewData,
      handleEditData,
      handleConfirm,
      parentId,
      parentUrlPre,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
