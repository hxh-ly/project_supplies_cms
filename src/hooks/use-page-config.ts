import { ref } from 'vue'
import pageContent from '@/components/page-content'
import { handleQueryDate } from '@/util/date-format'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetClick = () => {
    console.log(pageContentRef.value)

    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    const modifyInfo = handleQueryDate(queryInfo, [
      'gmtWarehoused',
      'gmtBought'
    ])
    pageContentRef.value?.getPageData(modifyInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
