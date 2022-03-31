import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '80px',
  modelWidth: '60%',
  formItem: [
    {
      field: 'gmtStart',
      type: 'date',
      label: '借用时间',
      placeholder: '借用时间',
      options: []
    },
    {
      field: 'gmtEnd',
      type: 'date',
      label: '归还时间',
      placeholder: '归还时间',
      options: []
    },
    {
      field: 'borrowReason',
      type: 'textArea',
      label: '借用原因',
      placeholder: '借用原因',
      options: []
    },
    {
      field: 'materialIdNumberMap',
      label: '物资列表',
      type: 'selfDefine',
      downOptions: [
        { title: '工具', value: 0 },
        { title: '消耗品', value: 1 },
        { title: '耐用品', value: 2 }
      ],
      otherOptions: {
        group: [{ id: 0, num: 31 }],
        count: 10
      }
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
