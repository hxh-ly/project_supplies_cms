export const contentTableConfig = {
  title: '选择借用物资',
  /*   "borrowInfoId": "1503023080140865536",
  "borrowReason": "借用原因",
  "gmtStart": "2022-03-13T15:00:04.000+00:00",
  "gmtEnd": "2022-03-13T15:00:04.000+00:00",
  "borrowState": 0,
  "materialsInfo": null,
  "userId": "",
  "userInfo": {
      "userId": "test",
      "account": "用户账号名",
      "telNumber": "13323323334"
  } */
  labelWidth: '80px',
  modelWidth: '60%',
  tableList: {
    title: '选择借用物资',
    isShowId: false,
    isShowSelect: true,
    propList: [
      {
        prop: 'name',
        label: '物资名称',
        minWidth: '80',
        slotName: 'name'
      },
      {
        prop: 'model',
        label: '型号',
        minWidth: '80',
        slotName: 'model'
      },
      {
        prop: 'borrowNumber',
        label: '剩余数量',
        minWidth: '80',
        slotName: 'borrowNumber'
      }
    ]
  },
  isShowId: false,
  isShowSelect: false
}
