const getSelectIdByName = (isArray = true, idArr: any, title: any) => {
  if (isArray) {
    const arr: any = []
    for (const cur of title) {
      arr.push(idArr.find((item: any) => item.title == cur).realVal)
    }
    return arr
  } else {
    let res: any = null
    res = idArr.find((item: any) => item.title == title).realVal
    return res
  }
}
const getSelectNameById = (
  modelFormConfigRef: any,
  idArr: any,
  extIdArr: any
) => {
  const arr: any = []
  for (const cur of extIdArr) {
    arr.push(idArr.find((item: any) => item.value == cur).title)
  }
  return arr
}
/*
searchFormConfig :配置
formData 待修改参数
*/

// 是 ---->  1
// string ---> id
const realValFromName = (searchFormConfig: any, formData: any) => {
  searchFormConfig.formItem.forEach((item: any) => {
    if (item.type == 'select') {
      const field = item.field
      const readyTransform = formData[`${field}`]
      if (!item.isMultiple) {
        //单个
        const cur = item.options.find(
          (options_item: any) => options_item.title == readyTransform
        )
        if (cur) {
          formData[`${field}`] = cur.realVal
        }
      } else {
        //多个    ['aaa','bbb','ccc'] ---> ['1','2','3']
        const arr = getSelectIdByName(true, item.options, readyTransform)
        formData[`${field}`] = arr
      }
    }
  })
}
export { getSelectNameById, getSelectIdByName, realValFromName }
