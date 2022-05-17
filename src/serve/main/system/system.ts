import { xhrequest, dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
import qs from 'qs'
export function getPageListData(url: string, queryInfo: any): any {
  const strQuery = qs.stringify(queryInfo)
  return dgutRequest.get<IDataType>({
    url: url + `?${strQuery}`,
    isShowLoading: false
  })
}
export function deletePageData(url: string) {
  return dgutRequest.delete<IDataType>({
    url: url
  })
}
export function createPageData(url: string, newData: any) {
  return dgutRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return dgutRequest.put<IDataType>({
    url: url,
    data: editData
  })
}
