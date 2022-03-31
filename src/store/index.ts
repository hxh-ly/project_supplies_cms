import localCache from '@/util/cache'
import { createStore, Store, useStore as useVueStore } from 'vuex'
import { login } from './login/login'
import { system } from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootStore, IStoreType } from './type'
import { getPageListData } from '@/serve/main/system/system'
import {
  dgut_getMaterialListData,
  dgut_requestProjectItem
} from '@/serve/DgutRequest/dgutRequest'
const store = createStore<IRootStore>({
  state: () => {
    return {
      name: 'hxh',
      age: 'asda',
      entriesDepartment: [], //项目组
      entriesRole: [],
      entriesMenu: [],
      entriesMaterial: []
    }
  },
  mutations: {
    changeEntriesDepartMent(state, list: any) {
      state.entriesDepartment = list
    },
    changeEntriesRole(state, list: any) {
      state.entriesRole = list
    },
    changeEntriesMenu(state, list: any) {
      state.entriesMenu = list
    },
    changeEntriesMaterial(state, list: any) {
      console.log('init物品list', list)
      state.entriesMaterial = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      /* const departMentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      }) */
      const departMentResult = await dgut_requestProjectItem(
        'projectTeam/list/all'
      )
      const departmentList = departMentResult.data
      commit('changeEntriesDepartMent', departmentList)
      const RoleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = RoleResult.data
      commit('changeEntriesRole', roleList)
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      //console.log('````````````````', menuList)
      commit('changeEntriesMenu', menuList)
      //顺便拿到所有的物品菜单
      const materialResult = await dgut_getMaterialListData('/material/list', {
        size: 50,
        current: 1
      })
      const { records: materialList } = materialResult.data.list
      commit('changeEntriesMaterial', materialList)
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
