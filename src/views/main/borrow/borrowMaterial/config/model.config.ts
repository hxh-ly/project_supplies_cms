import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '80px',
  modelWidth: '60%',
  formItem: [
    {
      field: 'gmtStart',
      type: 'date',
      label: '借用时间',
      options: []
    },
    {
      field: 'gmtEnd',
      type: 'date',
      label: '归还时间',
      options: []
    },
    {
      field: 'borrowStateInfo',
      type: 'input',
      label: '借用状态',
      options: []
    },
    {
      field: 'borrowReason',
      type: 'textArea',
      label: '借用原因',
      options: []
    }
  ],
  tableList: {
    title: '借用列表',
    isShowId: false,
    isShowSelect: false,
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
        label: '借用数量',
        minWidth: '80',
        slotName: 'borrowNumber'
      },
      {
        prop: 'photo',
        label: '物资图片',
        minWidth: '100',
        slotName: 'image'
      }
    ]
  },
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
