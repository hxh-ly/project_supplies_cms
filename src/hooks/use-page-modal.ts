import { ref } from 'vue'
import pageModel from '@/components/page-model'
type CallbackFn = (item?: any, data?: any) => void
export const usePageModal = (addFnCb?: CallbackFn, editFnCb?: CallbackFn) => {
  //ref
  const pageModalRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})
  //
  const handleNewData = (type: any, item: any) => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.curFormType='add'
      pageModalRef.value.dialogVisible = true
    }
    addFnCb && addFnCb()
  }
  const handleEditData = async (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.curFormType='edit'
      pageModalRef.value.dialogVisible = true
    }
    if (pageModalRef.value && editFnCb && pageModalRef.value.hasTable) {
      pageModalRef.value.createTableList(item)
      /*    pageModalRef.value.innerTable.value = await editFnCb(item)
      console.log('进edit了嘛',pageModalRef.value.innerTable); */
    } else editFnCb && editFnCb(item, defaultInfo)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
