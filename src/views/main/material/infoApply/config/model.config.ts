import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '100px',
  modelWidth: '60%',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '物资名',
      placeholder: '请输入物资名',
      rules: [],
      options: []
    },
    {
      field: 'model',
      type: 'input',
      label: '物资型号',
      placeholder: '请输入物资型号',
      options: []
    },
    {
      field: 'fixedAssets',
      type: 'select',
      label: '固定资产',
      placeholder: '请选择是否是固定资产',
      options: [
        {
          title: '是',
          value: '是',
          realVal: true
        },
        {
          title: '否',
          value: '否',
          realVal: false
        }
      ]
    },
    {
      field: 'unitPrice',
      type: 'input',
      label: '单价/元',
      placeholder: '请输入单价',
      options: []
    },
    {
      field: 'gmtBought',
      type: 'date',
      label: '购买时间',
      placeholder: '请输入购买时间',
      options: []
    },
    {
      field: 'gmtWarehoused',
      type: 'date',
      label: '入库时间',
      placeholder: '请输入入库时间',
      options: []
    },
    {
      field: 'detail',
      type: 'textArea',
      label: '物资详情',
      placeholder: '请输入物资详情',
      options: []
    },
    {
      field: 'remark',
      label: '备注信息',
      type: 'textArea',
      placeholder: '请输入备注信息'
    },
    {
      field: 'projectTeamId',
      label: '所属项目组',
      placeholder: '请选择所属项目组',
      type: 'select',
      options: [
        /*  {
          title: 'RC',
          value: '34847349384'
        },
        {
          title: 'RM',
          value: '34847349384'
        },
        {
          title: '普通项目组',
          value: '34847349384'
        } */
      ]
    },
    {
      field: 'photo',
      label: '物资图片',
      type: 'upLoad'
      //placeholder: '请输入备注信息'
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入物资名',
        trigger: 'blur'
      },
      { min: 2, max: 20, message: '长度需在2~20之间', trigger: 'blur' }
    ],
    model: [
      {
        required: true,
        message: '请输入物资名',
        trigger: 'blur'
      },
      { min: 2, max: 20, message: '长度需在2~20之间', trigger: 'blur' }
    ],
    gmtBought: [
      {
        type: 'date',
        required: true,
        message: '请选择时间',
        trigger: 'change'
      }
    ],
    fixedAssets: [
      {
        required: true,
        message: '请选择是否固定资产',
        trigger: 'change'
      }
    ],
    gmtWarehoused: [
      {
        type: 'date',
        required: true,
        message: '请选择时间',
        trigger: 'change'
      }
    ],
    unitPrice: [
      {
        required: true,
        type: 'string',
        trigger: 'blur',
        message: '单价不能为空'
      },
      {
        pattern:
          /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        message: '请输入正确额格式,可保留两位小数'
      }
    ],
    projectTeamId: [
      {
        required: true,
        message: '选择所属项目组',
        trigger: 'change'
      }
    ],
    file: [
      {
        required: true,
        trigger: 'change'
      }
    ]
  }
}
