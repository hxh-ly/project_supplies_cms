import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD'
export default function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs(utcString).utcOffset(8).format(format)
}
export function formatTimeStamp(
  timeStamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs(timeStamp).format(format)
}

export function handleDatePicker(key: string, value: any) {
  if (value[key]) {
    //前三位是get
    let Suffix = key.slice(3)
    let start = `start${Suffix}`
    let end = `end${Suffix}`
    return {
      [start]: formatUtcString(value[key][0]),
      [end]: formatUtcString(value[key][1])
    }
  }
}

export function handleQueryDate(queryInfo: any, keys?: any[]) {
  //对查询参数进行处理
  let modifiedInfo: any = {
    ...queryInfo
  }
  for(let key of keys!!) {
   let departTimerRange =  handleDatePicker(key, queryInfo)
   modifiedInfo={...modifiedInfo,...departTimerRange}
   delete modifiedInfo[key]
  }
  console.log('查询的参数', modifiedInfo)
  return modifiedInfo
}
