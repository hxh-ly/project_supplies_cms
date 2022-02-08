interface IAccount {
  name: string
  password: string
}
interface IDataType<T = any> {
  code: number
  data: T
}
interface ILoginType {
  id: string
  name: string
  token: string
}
export { IAccount, IDataType, ILoginType }
