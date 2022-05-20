import HXHRequest from './request'
import { VUE_APP_BASE_URL, TIMEOUT } from './DgutRequest/config'
import { checkTokenIsVaild } from '@/util/handleRequest'
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
  // baseURL: 'http://4383d8d6-8af9-4a2a-92e6-896bfc356b38.mock.pstmn.io',
  // baseURL:'http://119.91.237.88:8082',
  baseURL: VUE_APP_BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      /*
      真正实现登录 */
      const token = localCache.getItem('token')
      if (token) {
        if (config.headers) {
          config.headers['auth-token'] = `${token}`
        }
      }

      // config.headers['auth-token'] = 'ylhao666'
      return config
    },
    resInterceptor: (config) => {
      return checkTokenIsVaild(config.data.code, () => {
        return config
      })
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
export const normalRequest = async (
  url: string,
  method: any = 'post',
  data: any
) => {
  const formData: any = new FormData()
  for (const i in data) {
    formData.append(i, data[i])
  }
  //console.log(formData)
  const token = localCache.getItem('token')
  const instance = axios.create({
    baseURL: '/dgut',
    headers: {
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    timeout: TIMEOUT
  })
  instance.interceptors.response.use((config) => {
    return checkTokenIsVaild(config.data.code, () => {
      return config.data
    })
  })
  return instance({
    url: url,
    data: formData,
    method: method
  })
  /*   await axios({
    method,
    url: '/dgut' + url,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    data: formData
  }) */
}
