import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HXHRequestInterceptor, HXHRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const DEFAULT_LOADING = true
class HXHRequest {
  instance: AxiosInstance
  interceptors?: HXHRequestInterceptor
  isShowLoading: boolean
  loading?: LoadingInstance
  constructor(config: HXHRequestConfig) {
    //1 创建
    this.instance = axios.create(config)
    //初始化选项
    this.interceptors = config.interceptors
    this.isShowLoading = config.isShowLoading ?? DEFAULT_LOADING
    //来自config
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.resInterceptor,
      this.interceptors?.resInterceptorCatch
    )
    //全局
    this.instance.interceptors.request.use((config) => {
      // 全局请求加上loading
      if (this.isShowLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '请求中...',
          background: 'rgba(0,0,0,.5)'
        })
      }
      //console.log('全局请求拦截+loading')
      return config
    })
    this.instance.interceptors.response.use((config) => {
      //console.log('全局响应拦截-loading')
      //取消loading
      setTimeout(() => {
        this.loading?.close()
      }, 1000)
      return config
    })
    //拦截返回的数据
    this.instance.interceptors.response.use(
      (res) => {
        //console.log('全局响应拦截-返回值 AxiosResponse')
        const data = res.data
        if (data.returnCode == '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status == '404') {
          console.log('404')
        }
        return err
      }
    )
  }
  request<T>(config: HXHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.resInterceptor) {
            res = config.interceptors.resInterceptor(res)
          }
          resolve(res)
          this.isShowLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.isShowLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  get<T>(config: HXHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HXHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HXHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HXHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HXHRequest
