import { xhrequest } from '../index'
import { IAccount, IDataType, ILoginType } from './type'
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return xhrequest.post<IDataType<ILoginType>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: string) {
  return xhrequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    isShowLoading: false
  })
}
export function requestUserMenusRoleId(id: string) {
  return xhrequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    isShowLoading: false
  })
}
