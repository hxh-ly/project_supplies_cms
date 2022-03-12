import HXHRequest from './request'
import { VUE_APP_BASE_URL, TIMEOUT } from './request/config'
import localCache from '@/util/cache'
const materialUrl = '119.91.237.88:8082'
//console.log('VUE_APP_BASE_URL', VUE_APP_BASE_URL)

export const xhrequest = new HXHRequest({
  //baseURL: VUE_APP_BASE_URL,
  baseURL: 'http://localhost:9002',
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getItem('token')
      if (token) {
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
      return config
    },
    resInterceptor: (config) => {
      return config
    }
  }
})

export const dgutRequest = new HXHRequest({
  baseURL: '/dgut',
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      config.headers['auth-token'] = 'ylhao666'
      return config
    },
    resInterceptor: (config) => {
      return config
    }
  }
})

/* xhrequest222 = new HXHRequest({
  baseURL: VUE_APP_BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求加loading=====')
      return config
    },
    resInterceptor: (config) => {
      console.log('响应的拦截')
      return config
    }
  }
}) */
