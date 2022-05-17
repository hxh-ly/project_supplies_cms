import { ElMessage } from 'element-plus'
const handleLoginPassword = (res: any) => {
  let { code, data } = res
  if (code == 200 && data.success) {

  } else {
    return false
  }
  return true
}

export { handleLoginPassword }
