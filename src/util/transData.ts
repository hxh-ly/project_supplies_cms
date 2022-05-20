const getSelectIdByName = (isArray = true, options: any, title: any) => {
  if (isArray) {
    const arr: any = []
    for (const cur of title) {
      arr.push(options.find((item: any) => item.title == cur).realVal)
    }
    return arr
  } else {
    let res: any = null
    res = options.find((item: any) => item.title == title).realVal
    return res
  }
}
const getSelectNameById = (
  isArray = true,
  options: any,
  realVal: any
) => {
  if (isArray) {
    const arr: any = []
    //[1,2,3]
    for (const cur of realVal) {
      arr.push(options.find((item: any) => item.realVal == cur).title)
    }
    return arr
  } else {
    let res: any = null
    res = options.find((item: any) => item.realVal == realVal).title
    return res
  }
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
const NameFromRealVal=(searchFormConfig: any,formData: any)=>{
  searchFormConfig.formItem.forEach((item: any) => {
    if (item.type == 'select') {
      const field = item.field
      //是['1','2','3']
      const readyTransform = formData[`${field}`]
      if (!item.isMultiple) {
        //单个
        const cur = item.options.find(
          (options_item: any) => options_item.realVal == readyTransform
        )
        if (cur) {
          formData[`${field}`] = cur.title
        }
      } else {
        //多个    ['1','2','3'] ---> ['a','b','b']
        const arr = getSelectNameById(true, item.options, readyTransform)
        formData[`${field}`] = arr
      }
    }
  })
}
export { getSelectNameById, getSelectIdByName, realValFromName,NameFromRealVal }
