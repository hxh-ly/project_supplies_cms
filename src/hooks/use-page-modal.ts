import { ref } from 'vue'
import pageModel from '@/components/page-model'
type CallbackFn = (item?: any) => void
export const usePageModal = (addFnCb?: CallbackFn, editFnCb?: CallbackFn) => {
  //ref
  const pageModalRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})
  //
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    addFnCb && addFnCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    console.log('defaultInfo.value', defaultInfo.value)

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editFnCb && editFnCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
