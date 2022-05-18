import { ElMessage } from 'element-plus'
const handleLoginPassword = (res: any) => {
  const { code, data } = res
  if (code == 200 && data.success) {
    return true
  } else {
    return false
  }
  return true
}

export { handleLoginPassword }
