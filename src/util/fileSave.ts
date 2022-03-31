import JSZip from 'jszip'
import FileSaver from 'file-saver'
import jsPDF from 'jspdf'
export function downLoadZip(ImgList: any[]) {
  const zip = new JSZip()
  ImgList.forEach((item: any) => {
    zip.file(
      item.fileName + '.png',
      item.url.slice(item.url.indexOf('base64') + 6),
      {
        base64: true
      }
    )
  })
  zip.generateAsync({ type: 'blob' }).then((content) => {
    FileSaver.saveAs(content, '二维码.zip')
  })
}

export function downImgToPdf(
  ImgList: any[],
  count: any = 30,
  imgSize: any = 40
) {
  const recordPdf = new jsPDF('l', 'mm', 'a4')
  const [docX, docY] = [210, 290]
  const imgWidth = imgSize,
    imgHeight = imgSize
  const initPadLeftPage = 10,
    initPadTopPage = 0
  ImgList.forEach((item) => {
    let rowAddPage = 0
    let colAddPage = 0
    let index = 0
    while (index < count) {
      if (rowAddPage > docY) {
        console.log('不够放了')
        break
      }
      if (colAddPage > docX) {
        rowAddPage += imgHeight
        colAddPage = 0
        console.log('该换行了')
      }
      recordPdf.addImage(
        item.url,
        'png',
        colAddPage + initPadLeftPage,
        rowAddPage + initPadTopPage,
        imgWidth,
        imgHeight
      )
      colAddPage += imgWidth
      index++
    }
    recordPdf.save(`${item.fileName}.pdf`)
  })
}
