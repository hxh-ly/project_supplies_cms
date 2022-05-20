import { ref, getCurrentInstance } from 'vue'
import pageContent from '@/components/page-content'
import { handleQueryDate } from '@/util/date-format'
export function usePageSearch(queryCb?: any) {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetClick = () => {
    // console.log(pageContentRef.value)

    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    const modifyInfo = queryCb ? queryCb(queryInfo) : queryInfo

    pageContentRef.value?.getPageData(modifyInfo)
  }
  //暂时没用
  const handleChangeQueryInfo = (v: any) => {
    ;(getCurrentInstance() as any).queryInfo.value = v
    console.log((getCurrentInstance() as any).queryInfo.value)
  }
  return [
    pageContentRef,
    handleResetClick,
    handleQueryClick,
    handleChangeQueryInfo
  ]
}
