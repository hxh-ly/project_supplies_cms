import { dgutRequest } from '@/serve'
import { IDataType } from '@/serve/type'
export function dgut_getMaterialListData(url: string, queryInfo: any): any {
  return dgutRequest.get<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: false
  })
}
