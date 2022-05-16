import { Module } from 'vuex'
import { IRootStore } from '../type'
import { ILoginState } from './type'
import router from '@/router'
import { mapMenuToRoutes, mapMenusToPermissions } from '@/util/map-menu'
import {
  accountLoginRequest,
  requestUserMenusRole
} from '@/serve/DgutRequest/login/login'
import { IAccount } from '@/serve/DgutRequest/login/type'
import localCache from '@/util/cache'
const login: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state: () => {
    return {
      token: 'aa',
      userInfo: 'asdas',
      userMenus: [],
      permission: []
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, playload: IAccount) {
      //1

      const loginData = await accountLoginRequest(playload)
      const { id, name, token } = loginData.data
      //...用户信息
      const userInfo = { name, id }
      commit('changeUserInfo', userInfo)
      commit('changeToken', token)
      localCache.setItem('userInfo', userInfo)
      localCache.setItem('token', token)
      /* 请求菜单，角色数据 */
      dispatch('getInitialDataAction', null, { root: true })

      //3 拿token请求菜单
      const UserInfoMenuRes = await requestUserMenusRole()
      const userMenus = UserInfoMenuRes.data
      console.log(
        '%c process--- accountLoginAction',
        'background:#aaa;color:#bada55',
        userMenus
      )

      localCache.setItem('userMenus', userMenus)
      commit('changeUserMenus', userMenus)

      //4 请求

      //console.log('从登录页进来才会执行，接着跳到main');
      //4 跳到首页
      router.push('/main')
    },
    phoneLoginAction({ commit }, playload: any) {
      //console.log('执行phoneLoginAction', playload)
    },
    loadLocalLogin({ commit, dispatch }) {
      console.log(
        '%c process---刷新时进入 loadLocalLogin',
        'background:#aaa;color:#bada55'
      )
      const token = localCache.getItem('token')
      if (token) {
        commit('changeToken', token)
        console.log(
          '%c process---InitialDataAction',
          'background:#aaa;color:#bada55',
          'token存在进行'
        )

        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getItem('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getItem('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //4 将用户的权限操作保存
      state.permission = mapMenusToPermissions(userMenus)
      console.log(
        '%c function---mapMenusToPermissions',
        'background:rgb(60, 182, 219)',
        '当前用户权限',
        state.permission
      )
      // console.log('路由添加前', userMenus)
      const routes = mapMenuToRoutes(userMenus)
      //console.log('%c function---mapMenuToRoutes','background:rgb(60, 182, 219)' , '当前用户拿到路由记录', routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // console.log('%c function---mapMenuToRoutes',router,'动态添加的路由对象')
    }
  }
}
export { login }
