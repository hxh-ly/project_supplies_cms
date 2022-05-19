import { ElMessage } from 'element-plus'
import router from '@/router'
function handleWorkRequest(fn: any, polyFill?: any) {
  //console.log(fn);
  return Promise.resolve(fn.call(null))
    .then((res) => {
      console.log(res);
      if (polyFill) {
        polyFill(res)
      }
      if (res.data && res.code == 200) {
        if (res.data.success) {
          ElMessage({
            message: res.data?.info || res.data?.message ||res.message ,
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
const checkTokenIsVaild = (code: any, fn?: any) => {
  //console.log('进到 checkTokenIsVaild');
  if (code == 440 || code == 430) {
    router.replace('/login')
    return
  } else {
    const res = fn && fn()
    return res
  }
}
export { handleWorkRequest, handleResetValue, checkTokenIsVaild }
