import { ElMessage } from 'element-plus'
function handleWorkRequest(fn: any, polyFill?: any) {
  //console.log(fn);
  return Promise.resolve(fn.call(null))
    .then((res) => {
      if (polyFill) {
        polyFill(res)
      }
      if (res.data&&res.code==200) {
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

const handleResetValue = (formData: any, EmptyObj: any) => {
  const nativeObj: any = EmptyObj
  for (const key in nativeObj) {
    formData.value[key] = nativeObj[key]
  }
}

export { handleWorkRequest, handleResetValue }
