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
export function getMultiQRcode(url = 'code', allId: any[]) {
  const list: any = []
  for (const id in allId) {
    list[id] = dgut_getQcode(url, allId[id].materialsId)
  }
  return Promise.all(list)
}
//提交表单
export function dgut_setOnApplyForm(url: string, queryInfo: any) {
  return dgutRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: true
  })
}
//获取详情
export function dgut_applyDetail(url = 'borrowInfo/get', id: any) {
  return dgutRequest.get<IDataType>({
    url: url + '/' + id,
    isShowLoading: false
  })
}
//请求项目组
export function dgut_requestProjectItem(url = 'projectTeam/list/all') {
  return dgutRequest.get<IDataType>({
    url: url,
    isShowLoading: false
  })
}
//取消借机申请
export function dgut_cancelBorrow(
  url = '/borrowInfo/cancel',
  borrowInfoId: string
) {
  return dgutRequest.put<IDataType>({
    url: url + '/' + borrowInfoId,
    isShowLoading: false
  })
}
//借用单状态
export function dgut_requestBorrowStateList(
  url = '/borrowInfo/borrowState/list'
) {
  return dgutRequest.get<IDataType>({
    url: url,
    isShowLoading: false
  })
}
//入库
export function dgut_materialReturn(
  url = '/borrowInfo/material/return',
  queryInfo: any
) {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}
//出库
export function dgut_materialBorrow(
  url = '/borrowInfo/material/borrow',
  queryInfo: any
) {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}
//修改物资信息
export function dgut_updateMaterialBaseInfo(
  url = '/material/modify',
  queryInfo: any
) {
  return dgutRequest.put<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}
