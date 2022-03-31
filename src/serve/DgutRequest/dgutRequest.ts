import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
export function dgut_getMaterialListData(url: string, queryInfo: any): any {
  return dgutRequest.get<IDataType>({
    url: url,
    params: { ...queryInfo },
    isShowLoading: false
  })
}
//请求获取二维码的图片
export async function dgut_getQcode(
  url: string,
  message: any,
  imageType: any = 'PNG'
) {
  return (
    await dgutRequest.get<IDataType>({
      url: url + '/' + message,
      params: { imageType: imageType },
      isShowLoading: false
    })
  ).data
}
//封装获取批量请求图片
export function getMultiQRcode(url: string, allId: any[]) {
  const list: any = []
  for (const id in allId) {
    list[id] = dgut_getQcode(url, allId[id].materialsId)
  }
  return Promise.all(list)
}
export function dgut_setOnApplyForm(url: string, queryInfo: any) {
  return dgutRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: true
  })
}
//获取详情
export function dgut_applyDetail(url: string, id: any) {
  return dgutRequest.get<IDataType>({
    url: url + '/' + id,
    isShowLoading: false
  })
}
//请求项目组
export function dgut_requestProjectItem(url: string) {
  return dgutRequest.get<IDataType>({
    url: url,
    isShowLoading: false
  })
}
