export const contentTableConfig = {
  title: '借用单列表',
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
  propList: [
    {
      prop: 'userId',
      label: '借用人ID',
      minWidth: '100',
      slotName: 'userId'
    },
    {
      prop: 'userInfo',
      label: '借用人',
      minWidth: '100',
      slotName: 'userInfo'
    },
    {
      prop: 'borrowReason',
      label: '借用原因',
      minWidth: '120',
      slotName: 'borrowReason'
    },
    {
      prop: 'borrowStateInfo',
      label: '借用状态',
      minWidth: '80',
      slotName: 'borrowStateInfo'
    },
    {
      prop: 'gmtStart',
      label: '借用时间',
      minWidth: '160',
      slotName: 'gmtStart'
    },
    {
      prop: 'gmtEnd',
      label: '归还时间',
      minWidth: '160',
      slotName: 'gmtEnd'
    },
    { label: '操作', minWidth: '120', slotName: 'handle' }
  ],
  isShowId: false,
  isShowSelect: false
}
