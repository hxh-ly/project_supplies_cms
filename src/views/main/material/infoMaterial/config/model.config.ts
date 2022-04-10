import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '80px',
  modelWidth: '60%',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '物资名称',
      placeholder: '请输入物资名称',

    },
  /*   {
      field: 'isFixedAssets',
      type: 'select',
      label: '固定资产',
      placeholder: '请选择',
      options: [
        { title: '是', value: 1 },
        { title: '否', value: 0 }
      ]
    }, */
    {
      field: 'model',
      type: 'input',
      label: '型号',
      placeholder: '请输入型号'
    },
    {
      field: 'type',
      type: 'select',
      label: '类型',
      placeholder: '请选择',
      options: [
        { title: '工具', value: 0 },
        { title: '消耗品', value: 1 },
        { title: '耐用品', value: 2 }
      ]
    },
    {
      field: 'gmtBought',
      type: 'date',
      label: '购买时间',
      placeholder: '购买时间',
      options: []
    },
    {
      field: 'borrowedNumber',
      type: 'numInput',
      label: '被借用数',
      placeholder: '被借用的数量',
      options: [],
      disable:true
    },

    {
      field: 'gmtWarehoused',
      type: 'date',
      label: '入库时间',
      placeholder: '入库时间',
      options: []
    },
    {
      field: 'totalNumber',
      type: 'numInput',
      label: '总数量',
      placeholder: '总数量',
      options: [],
      disable:true
    },
    {
      field: 'unitPrice',
      type: 'input',
      label: '单价',
      placeholder: '请输入单价'
      /* isHidden: false */
    },
    {
      field: 'notReturnedNumber',
      type: 'numInput',
      label: '未归还数',
      placeholder: '未归还的数量',
      options: [],
      disable:true
    },
    {
      field: 'detail',
      type: 'textArea',
      label: '详情',
      placeholder: '详情',
      options: []
    },
    {
      field: 'remark',
      type: 'textArea',
      label: '备注',
      placeholder: '备注',
      options: []
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 12
  }
}
