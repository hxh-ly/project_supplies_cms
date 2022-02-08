import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '商品名字',
      placeholder: '请输入商品名字'
    },
    {
      field: 'status',
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请选择商品地址'
    },

    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建时间范围',
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
    span: 8
  }
}
