import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')

const getAuthMenuList = (
  url: string = '/auth/permission/list',
  queryInfo: any
) => {
  let searchStr = qs.stringify(queryInfo)
  return dgutRequest.get<IDataType>({
    url:url+`?${searchStr}`,
    isShowLoading: true
    }
  )
}

const updateRolePermissions=(url:string='/auth/permission/bind',queryInfo:any)=>{
  return dgutRequest.post<IDataType>({
    url:url,
    data:{...queryInfo},
    isShowLoading: true
    }
  )
}

const addMenuRequest=(url:string='/auth/permission/addMenu',queryInfo:any)=>{
  return dgutRequest.post<IDataType>({
    url:url,
    data:{...queryInfo},
    isShowLoading: true
    }
  )
}

const addPageRequest=(url:string='/auth/permission/addPage',queryInfo:any)=>{
  return dgutRequest.post<IDataType>({
    url:url,
    data:{...queryInfo},
    isShowLoading: true
    }
  )
}
const addPermissionRequest=(url:string='/auth/permission/addPermission',queryInfo:any)=>{
  return dgutRequest.post<IDataType>({
    url:url,
    data:{...queryInfo},
    isShowLoading: true
    }
  )
}

const updateMenuAllReq=(url:string='/auth/permission/update',queryInfo:any)=>{
  return dgutRequest.post<IDataType>({
    url:url,
    data:{...queryInfo},
    isShowLoading: true
    }
  )
}
export {
  getAuthMenuList,
  updateRolePermissions,
  addMenuRequest,
  addPageRequest,
  addPermissionRequest,
  updateMenuAllReq
}
