import localCache from '@/util/cache'
import { createStore, Store, useStore as useVueStore } from 'vuex'
import { login } from './login/login'
import { system } from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootStore, IStoreType } from './type'
import { getPageListData } from '@/serve/main/system/system'
import {
  dgut_getMaterialListData,
  dgut_requestProjectItem,
  dgut_requestBorrowStateList
} from '@/serve/DgutRequest/dgutRequest'
const store = createStore<IRootStore>({
  state: () => {
    return {
      name: 'hxh',
      age: 'asda',
      entriesRole: [],
      entriesMenu: [],
      entriesMaterial: [],
      entriesDepartment: [], //项目组
      entriesBorrowState: [], //借机状态,
      entriesPermissions: [],
      rolePermissions:[]
    }
  },
  mutations: {
    changeEntriesDepartMent(state, list: any) {
      //console.log('正常保存下拉需要的', list)
      state.entriesDepartment = list
    },
    changeEntriesBorrowState(state, list: any) {
      //console.log('正常保存下拉需要的', list)
      state.entriesBorrowState = list
    },
    changeEntriesRole(state, list: any) {
      state.entriesRole = list
    },
    changeEntriesMenu(state, list: any) {
      state.entriesMenu = list
    },
    changeEntriesMaterial(state, list: any) {
      //console.log('init物品list', list)
      state.entriesMaterial = list
    },
    changeEntriesPermissions(state, list: any) {
      state.entriesPermissions = list
    },
    changeEntriesRolePermissions(state,data:any)
    {
      state.rolePermissions = data
    }
  },
  actions: {
    //初始化请求一些数据，放入vuex，是否要放入缓存呢
    async getInitialDataAction({ commit }) {
      const departmentList = (await dgut_requestProjectItem(undefined)).data
      commit('changeEntriesDepartMent', departmentList)
      //请求借用单状态
      const borrowStateList = (await dgut_requestBorrowStateList(undefined))
        .data
      commit('changeEntriesBorrowState', borrowStateList)
      const RoleResult = await getPageListData('/auth/role/list', {
        paginated: false,
        current: 1,
        size: 50
      })
      if(RoleResult.code==200) {
        const { list: roleList } = RoleResult.data
        commit('changeEntriesRole', roleList)
      }
      // 权限——菜单
      /* const permissionsResult = await getPageListData('/auth/permission/list', {
        treed: true,
        current: 1,
        size: 50,
        paginated: false
      })
      if(permissionsResult.code==200) {
        const permissionsList = permissionsResult.data.tree
        const rolePermissions = permissionsResult.data.rolePermissions
        // console.log('请求了tree', permissionsResult)
        // console.log('请求了tree后', rolePermissions)
        commit('changeEntriesPermissions', permissionsList)
        commit('changeEntriesRolePermissions',rolePermissions)
      } */
      //所有物资
      const materialResult = await dgut_getMaterialListData('/material/list', {
        size: 50,
        current: 1
      })
      const { records: materialList } = materialResult.data.list
      commit('changeEntriesMaterial', materialList)
      //获取所有项目组
    },
    async changeTreeAction({commit},payload:any) {
      console.log('changeTreeAction',payload);
      commit('changeEntriesRolePermissions',payload.permissionLists)
      //debugger
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  //store.dispatch('getInitialDataAction')
}
export function userStore(): Store<IStoreType> {
  return useVueStore()
}
export default store
