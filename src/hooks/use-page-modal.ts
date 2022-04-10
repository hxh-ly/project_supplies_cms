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
  const handleEditData = async (item: any) => {
    defaultInfo.value = { ...item }
    console.log('点击编辑的默认数据来源 defaultInfo.value', defaultInfo.value)

    if (pageModalRef.value) {
     // pageModalRef.value.totalInfoItem = { ...item }
      pageModalRef.value.dialogVisible = true
    }
    if (pageModalRef.value && editFnCb && pageModalRef.value.hasTable) {
      pageModalRef.value.createTableList(item)
      /*    pageModalRef.value.innerTable.value = await editFnCb(item)
      console.log('进edit了嘛',pageModalRef.value.innerTable); */
    } else editFnCb && editFnCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
