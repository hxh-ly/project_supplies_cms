export const contentTableConfig = {
  title: '物资列表',
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
      prop: 'unitPrice',
      label: '单价',
      minWidth: '60',
      slotName: 'unitPrice'
    },
    {
      prop: 'totalNumber',
      label: '总数量',
      minWidth: '70',
      slotName: 'totalNumber'
    },
    {
      prop: 'photo',
      label: '物资图片',
      minWidth: '100',
      slotName: 'image'
    },
    {
      prop: 'gmtBought',
      label: '购买时间',
      minWidth: '160',
      slotName: 'gmtBought'
    },
    {
      prop: 'gmtWarehoused',
      label: '入库时间',
      minWidth: '160',
      slotName: 'gmtWarehoused'
    },
    { label: '操作', minWidth: '120', slotName: 'handle' }
  ],
  //isShowId: true,
  isShowSelect: true
}
