import { xhrequest } from '@/serve'
import { IDataType } from '@/serve/type'
export function getPageListData(url: string, queryInfo: any): any {
  return xhrequest.post<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: false
  })
}
export function deletePageData(url: string) {
  return xhrequest.delete<IDataType>({
    url: url
  })
}
export function createPageData(url: string, newData: any) {
  return xhrequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return xhrequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
