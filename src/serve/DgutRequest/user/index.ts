import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')
//✔
const getUserList = (
  url = '/user/list',
  queryInfo: any = { current: 1, size: 10 }
) => {
  const qsStr = qs.stringify(queryInfo)
  //console.log('qsStr', qsStr)
  return dgutRequest.get<IDataType>({
    url: url + `?${qsStr}`,
    isShowLoading: true
  })
}
//✔
const addUser = (url = '/user/add', queryInfo: any = {}) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
const getUserDetailById = (url = 'user/get/',id:any) => {

  return dgutRequest.get<IDataType>({
    url: url+id,
    isShowLoading: true
  })
}


const bindTeamById = (url = '/projectTeam/user/bind', queryInfo: any = {}) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}

const bindRoleById = (url = '/auth/role/bind', queryInfo: any = {}) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: false
  })
}

export {
  getUserList,
  addUser,
  getUserDetailById,
  bindTeamById,
  bindRoleById
}
