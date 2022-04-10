import { ElMessage } from 'element-plus'
export function handleWorkRequest(fn: any, polyFill?: any) {
  //console.log(fn);
  return Promise.resolve(fn.call(null))
    .then((res) => {
      if (polyFill) {
        polyFill()
      }
      if (res.data) {
        if (res.data.success) {
          ElMessage({
            message: res.data?.info || res.data?.message,
            icon: 'success',
            duration: 500
          })
          return
        } else {
          throw res.data?.info || res.data?.message
        }
      }
      if (res.errorMessage) {
        throw res.errorMessage
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        icon: 'error',
        duration: 500
      })
    })
}
