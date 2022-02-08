import { userStore } from '@/store'
export function usePermission(pageName: string, handleName: string) {
  const store = userStore()
  const permission = store.state.login.permission
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permission.find((item: any) => item === verifyPermission)
}
