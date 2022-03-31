import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '物资名字',
      placeholder: '请输入商品名字'
    },
    {
      field: 'unitPrice',
      type: 'input',
      label: '物资单价',
      placeholder: '请输入物资单价'
    },
    {
      field: 'model',
      type: 'input',
      label: '物资型号',
      placeholder: '请选择物资型号'
    },

    {
      field: 'gmtWarehoused',
      type: 'date',
      label: '入库时间',
      placeholder: '请选择创建时间范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    },
    {
      field: 'gmtBought',
      type: 'date',
      label: '购买时间',
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
    span: 12
  }
}
