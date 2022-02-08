import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'
interface IRootStore {
  name: string
  age: string
  entriesDepartment: any[]
  entriesRole: any[]
  entriesMenu: any[]
}
interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export { IRootStore }
export type IStoreType = IRootStore & IRootWithModule
