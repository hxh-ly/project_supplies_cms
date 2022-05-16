import { dgutRequest } from '@/serve'
import { IAccount, IDataType, ILoginType } from './type'
enum LoginApi {
  AccountLogin = '/auth/login',
  LoginUserInfo = '/users/',
  UserMenus = '/menu'
}
export function accountLoginRequest(account: IAccount) {
  return dgutRequest.post<IDataType<ILoginType>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function   requestUserMenusRole() {
  console.log('%c', 'background:orange', '请求-requestUserMenusRole-权限菜单')
  return dgutRequest.get<IDataType>({
    url: LoginApi.UserMenus + '/list',
    isShowLoading: false
  })
}
/* export function requestUserInfoById(id: string) {
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
 */
