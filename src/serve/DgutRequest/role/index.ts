import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')
//✔
const addRole = (url: string = '/auth/role/add', queryInfo: any = {}) => {
  return dgutRequest.post<IDataType>({
    url: url,
    data: { ...queryInfo },
    isShowLoading: true
  })
}
export {  addRole }
