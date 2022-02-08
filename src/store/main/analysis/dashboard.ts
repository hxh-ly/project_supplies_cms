import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootStore } from '../../type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/serve/main/analysis/dashborad'
export const dashboardModule: Module<IDashboardState, IRootStore> = {
  namespaced: true,
  state: {
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    addressGoodsSale: []
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult: any = await getCategoryGoodsCount()
      const categorySaleResult: any = await getCategoryGoodsSale()
      const categoryFavorResult: any = await getCategoryGoodsFavor()
      const addressGoodsResult: any = await getAddressGoodsSale()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list: any) {
      console.log('aaaaaaaaaaaaaaaaaaaa', list)

      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: any) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: any) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list: any) {
      state.addressGoodsSale = list
      console.log('~~~~~~~~~', list)
    }
  }
}
export default dashboardModule
