import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItem: [
    {
      field: 'userInfo',
      type: 'input',
      label: '借用人名字',
      placeholder: '请输入借用人'
    },
    {
      field: 'state',
      type: 'select',
      label: '借用状态',
      placeholder: '请输入借用状态',
      options: [
        {
          title: '未借用',
          value: 0
        },
        {
          title: '已借用',
          value: 1
        },
        {
          title: '已归还',
          value: 2
        }
      ]
    },
    {
      field: 'gmtStart',
      type: 'datepicker',
      label: '借用时间',
      placeholder: '请选择时间范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    },
    {
      field: 'gmtEnd',
      type: 'datepicker',
      label: '归还时间',
      placeholder: '请选择时间范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 12
  }
}
