import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')
//✔
const getUserList = (
  url: string = '/user/list',
  queryInfo: any = { current: 1, size: 10 }
) => {
  let qsStr = qs.stringify(queryInfo)
  //console.log('qsStr', qsStr)
  return dgutRequest.get<IDataType>({
    url: url + `?${qsStr}`,
    isShowLoading: true
  })
}
//✔
const addUser = (url: string = '/user/add', queryInfo: any = {}) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
const getTeamById=(url: string = '/user/add', queryInfo: any = {})=>{
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
const getRoleById=(url: string = '/user/add', queryInfo: any = {})=>{

}

const bindTeamById=(url:string ='/projectTeam/user/bind',queryInfo:any={})=>{
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}

const bindRoleById=(url:string ='/auth/role/bind',queryInfo:any={})=>{
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}

export { getUserList, addUser,getRoleById,getTeamById,bindTeamById,bindRoleById }
