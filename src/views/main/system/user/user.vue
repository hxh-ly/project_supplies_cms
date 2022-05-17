<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick" />
    <page-content ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="user" :isDgut="true"
      :requestInfo="requestInfo" @newBtnClick="handleNewData" @editBtnClick="handleEditData"
      :allPermissionBtn="allPermissionBtn">
    </page-content>
    <page-model ref="pageModalRef" pageName="user" :modelConfig="modelFormConfigRef" :defaultInfo="defaultInfo"
      :requestInfo="requestInfo" @confirmClick="handleConfirm">
    </page-model>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watchEffect,
  onMounted,
  reactive,
  toRaw
} from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelFormConfig } from './config/model.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'
import store, { userStore } from '@/store'
import { usePageSearch } from '@/hooks/use-page-config'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  getUserDetailById,
  bindTeamById,
  bindRoleById
} from '@/serve/DgutRequest/user/index'
import { handleWorkRequest, handleResetValue } from '@/util/handleRequest'
import {getSelectIdByName} from '@/util/transData'
export default defineComponent({
  name: 'users',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },
  setup() {
    const requestInfo = {
      update: '/auth/user/update',
      get: '/user/list',
      add: '/user/add',
      delete: '/auth/user/delete/'
    }
    const allPermissionBtn = reactive([
      { title: 'isAdd', name: '添加', flag: 'add' },
      { title: 'isDelete', name: '删除', flag: 'delete' },
      { title: 'isUpdate', name: '修改', flag: 'update' },
      { title: 'isQuery', name: '查询', flag: 'query' }
    ])
    // 请求数据
    let userSearch = reactive({ current: 1, pageSize: 10 })
    let userList = reactive([])
    // watchEffect要用.value
    // 对象要具体到某一个属性
    /*     onMounted(() => {
          watchEffect(() => {
            getUserList(undefined, { ...userSearch }).then(res => {
              if (res.code == 200) {
                let { list } = res.data
                userList = list.records
                console.log(userList)
              }
              console.log('test getUserList', res);
            })
          })
        }) */
    const addDataFn: any = () => {
  for(let i of modelFormConfigRef.value.formItem) {
        if( i.field === 'password' || i.field === 'userId') {
            i.isHidden = false
        }
      }
    }
    const getSelectNameById = (idArr: any, extIdArr: any) => {
      let arr: any = []
      for (let cur of extIdArr) {
        arr.push(idArr.find((item: any) => item.value == cur).title)
      }
      return arr;
    }

    const editDataFn = (item: any, defaultInfo: any) => {
      if (item && item.userId) {
        getUserDetailById(undefined, item.userId).then(res => {
          defaultInfo.value = { ...res.data.detail }
          //roleIds   projectTeamIds
          let roleNameList = getSelectNameById(modelFormConfigRef.value.formItem.find((v: any) => v.field == 'roleIds')?.options, defaultInfo.value.roleIds)
          let projectNameList = getSelectNameById(modelFormConfigRef.value.formItem.find((v: any) => v.field == 'projectTeamIds')?.options, defaultInfo.value.projectTeamIds)
          defaultInfo.value = { ...defaultInfo.value, roleIds: roleNameList, projectTeamIds: projectNameList }
          console.log(defaultInfo.value);
        })
      }
      debugger
      for(let i of modelFormConfigRef.value.formItem) {
        if( i.field === 'password' || i.field === 'userId') {
            i.isHidden = true
        }
      }
      //动态请求数据 set到 defaultInfo里
    }

    //2 动态添加项目组和角色列表
    const modelFormConfigRef = computed(() => {
      const store = userStore()
      const departMentItem = modelFormConfig.formItem.find(
        (item) => item.field === 'projectTeamIds'
      )
      departMentItem!.options = store.state.entriesDepartment.map((item) => ({
        title: item.name,
        value: item.projectTeamId
      }))
      const roleItem = modelFormConfig.formItem.find(
        (item) => item.field === 'roleIds'
      )
      roleItem!.options = store.state.entriesRole.map((item) => ({
        title: item.name,
        value: item.roleId,
      }))
      return modelFormConfig
    })

    //3 获取公共变量和函数
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    let [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(addDataFn, editDataFn)
    const handleSelectProp = (e: any) => {
      let queryInfo: any = null
      let downSelectObj = modelFormConfig.formItem.find(
        (item) => item.type == 'select'
      )
      let field: any = downSelectObj?.field
      if (downSelectObj && field) {
        let eField = toRaw(e[`${field}`])
        let trueVal = null
        if (Array.isArray(eField)) {
          let arr: any = []
          downSelectObj?.options?.forEach((item) => {
            if (eField.indexOf(item.title) > -1) {
              arr.push(item.value)
            }
          })
          trueVal = arr
        } else {
          trueVal = downSelectObj?.options?.find(
            (item) => item.title == e![`${field}`]
          ).value
        }
        queryInfo = { ...e, [`${field}`]: trueVal }
      } else {
        queryInfo = { ...e }
      }
      console.log(queryInfo)
      return queryInfo
    }
    const handleConfirm = async (e: any, type: any) => {
      //拿到下拉的options
      /*  debugger
      let queryInfo =  handleSelectProp(e)
      await handleWorkRequest(() => addUser(undefined, queryInfo), (res: any) => { console.log(res) }) */
      //  console.log('操作基本信息后去修改其他接口',e,type);
      switch (type) {
        case 'edit':
          //绑定角色
          let  projectTeamIds =getSelectIdByName(true,modelFormConfigRef.value.formItem.find((item:any)=>item.field=='projectTeamIds')?.options ,e.projectTeamIds)
           let  roleIds =getSelectIdByName(true,modelFormConfigRef.value.formItem.find((item:any)=>item.field=='roleIds')?.options ,e.roleIds)
          debugger
          handleWorkRequest(
            () =>
              bindTeamById(undefined, {
                userId: e.userId,
                projectTeamIds: projectTeamIds
              }),
            (res: any) => {
              console.log(res)
            }
          )
          //绑定项目组
          handleWorkRequest(
            () =>
              bindRoleById(undefined, { userId: e.userId, roleIds: roleIds }),
            (res: any) => {
              console.log(res)
            }
          )
          break
      }
    }
    const allProjectTeams = computed(() => {
      return store.state.entriesDepartment
    })
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
      defaultInfo,
      userSearch, //查询条件
      handleConfirm, //确定添加或者修改
      allPermissionBtn,
      requestInfo,
      allProjectTeams //所有项目组
    }
  }
})
</script>

<style scoped>
</style>
