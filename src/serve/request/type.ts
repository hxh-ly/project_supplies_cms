import { AxiosRequestConfig, AxiosResponse } from 'axios'
// 请求的拦截器
class HXHRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  resInterceptor?: (config: T) => T
  resInterceptorCatch?: (err: any) => any
}

// 请求的配置
interface HXHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HXHRequestInterceptor<T>
  isShowLoading?: boolean
}
export { HXHRequestInterceptor, HXHRequestConfig }
