const getSelectIdByName = (isArray:Boolean=true,idArr: any, title: any) => {
  if(isArray) {
    let arr: any = []
    for (let cur of title) {
      arr.push(idArr.find((item: any) => item.title == cur).value)
    }
    return arr;
  }else {
    let res: any = null
    res = idArr.find((item: any) => item.title == title).value;
    return res;
  }

}
const getSelectNameById = (modelFormConfigRef:any, idArr: any, extIdArr: any) => {
  let arr: any = []
  for (let cur of extIdArr) {
    arr.push(idArr.find((item: any) => item.value == cur).title)
  }
  return arr;
}
export {
  getSelectNameById,
  getSelectIdByName
}


