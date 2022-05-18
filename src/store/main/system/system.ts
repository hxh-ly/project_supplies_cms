import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootStore } from '../../type'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/serve/main/system/system'
import { dgut_getMaterialListData } from '@/serve/DgutRequest/dgutRequest'
const system: Module<ISystemState, IRootStore> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      materialList: [],
      materialCount: 0,
      borrowInfoList: [],
      borrowInfoCount: 0,
      permissionList: [], //
      permissionCount: 0
    }
  },
  actions: {
    async getPageListAction({ commit, dispatch }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = `${payload.url}`
      let pageResult = null
      //毕设
      if (payload.isDgut) {
        pageResult = await dgut_getMaterialListData(pageUrl, payload.queryInfo)
        let list = pageResult.data.list?.records || pageResult.data.list || pageResult.data.listWithPage?.records ||pageResult.data.tree ||[]
        let totalCount = pageResult.data.list?.totalCount || pageResult.listWithPage?.totalCount || 0
        totalCount = totalCount||list.length
        const changePageName =
          pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
        commit(`change${changePageName}List`, list)
        commit(`change${changePageName}Count`, totalCount)
        if (pageName == 'permission') {
          dispatch('login/flashMenu', null, { root: true })
        }
      }
    },
    async deletePageData(context, playload: any) {
      const { url, pageName, requestInfo, listOtherParams } = playload
      await deletePageData(url)
      context.dispatch('getPageListAction', {
        isDgut: true,
        url: requestInfo.get,
        pageName: pageName,
        queryInfo: Object.assign({
          size: 10,
          current: 1,
          ...listOtherParams
        })
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData, url, requestInfo } = payload
      await createPageData(url, newData)
      dispatch('getPageListAction', {
        isDgut: true,
        url: requestInfo.get,
        pageName: pageName,
        queryInfo: Object.assign({
          size: 10,
          current: 1
        })
      })
    },
    async editPageDataAction({ dispatch }, playload: any) {
      const { pageName, editData, url, requestInfo, listOtherParams } = playload
      await editPageData(url, editData)
      dispatch('getPageListAction', {
        isDgut: true,
        url: requestInfo.get,
        pageName: pageName,
        queryInfo: Object.assign({
          size: 10,
          current: 1,
          ...listOtherParams
        })
      })
    }
  },
  mutations: {
    changeUserList(state, data: any) {
      state.userList = data
    },
    changeUserCount(state, data: any) {
      state.userCount = data
    },
    changeRoleList(state, data: any) {
      state.roleList = data
    },
    changeRoleCount(state, data: any) {
      state.roleCount = data
    },
    changeGoodsList(state, data: any) {
      state.goodsList = data
    },
    changeGoodsCount(state, data: any) {
      state.goodsCount = data
    },
    changeMenuList(state, data: any) {
      state.menuList = data
    },
    changeMenuCount(state, data: any) {
      state.menuCount = data
    },
    changeMaterialList(state, data: any) {
      state.materialList = data
    },
    changeMaterialCount(state, data: any) {
      state.materialCount = data
    },
    changeBorrowInfoList(state, data: any) {
      state.borrowInfoList = data
    },
    changeBorrowInfoCount(state, data: any) {
      state.borrowInfoCount = data
    },
    changePermissionList(state, data: any) {
      state.permissionList = data
    },
    changePermissionCount(state, data: any) {
      state.permissionCount = data
      // console.log(state.permissionCount)
    }
  },
  getters: {
    pageListData(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}
export { system }
