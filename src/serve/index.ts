import HXHRequest from './request'
import { VUE_APP_BASE_URL, TIMEOUT } from './request/config'
import axios from 'axios'
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
/* export const normalRequest = (data: any) => {
  const formData: any = new FormData()
  for (let i in data) {
    formData[i] = data[i]
  }
  return new HXHRequest({
    baseURL: '/dgut',
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'multipart/form-data'
      //, 'auth-token': 'ylhao666'
    },
    formData,
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ]
  })
} */
export const normalRequest = async (url: string, data: any) => {
  const formData: any = new FormData()
  for (const i in data) {
    formData.append(i, data[i])
  }
  console.log(formData)
  await axios({
    method: 'post',
    url: '/dgut' + url,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'multipart/form-data',
      'auth-token': 'ylhao666'
    },
    data: formData
  })
}

/* xhrequest222 = new HXHRequest({
  baseURL: VUE_APP_BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('?????????loading=====')
      return config
    },
    resInterceptor: (config) => {
      console.log('???????????????')
      return config
    }
  }
}) */
