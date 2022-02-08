//转换成自己需要的
import { coordinateData } from './coordinate-data'
export function convertData(data: any) {
  const res: any[] = []
  for (let i = 0; i < data.length; i++) {
    //const geoCoord
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
