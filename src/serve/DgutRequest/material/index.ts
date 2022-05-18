import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
const qs = require('qs')
enum MaterialApi {
  MaterialDetail = '/material/get',

}
const getMaterialDetail=(id:any)=>{
  return dgutRequest.get<IDataType>({
    url: MaterialApi.MaterialDetail + '/'+id,
  })
}

export {
  getMaterialDetail
}
