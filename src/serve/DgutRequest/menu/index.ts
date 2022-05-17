import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')

const getAuthMenuList = (url = '/auth/permission/list', queryInfo: any) => {
  const searchStr = qs.stringify(queryInfo)
  return dgutRequest.get<IDataType>({
    url: url + `?${searchStr}`,
    isShowLoading: true
  })
}

const updateRolePermissions = (
  url = '/auth/permission/bind',
  queryInfo: any
) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}

const addMenuRequest = (url = '/auth/permission/addMenu', queryInfo: any) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}

const addPageRequest = (url = '/auth/permission/addPage', queryInfo: any) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
const addPermissionRequest = (
  url = '/auth/permission/addPermission',
  queryInfo: any
) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}

const updateMenuAllReq = (url = '/auth/permission/update', queryInfo: any) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
export {
  getAuthMenuList,
  updateRolePermissions,
  addMenuRequest,
  addPageRequest,
  addPermissionRequest,
  updateMenuAllReq
}
