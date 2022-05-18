import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '80px',
  formItem: [
    {
      field: 'account',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'userId',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号'
      // disable:true,
    },
    {
      field: 'password',
      type: 'input',
      label: '用户密码',
      placeholder: '请输入密码'
    },
    {
      field: 'telNumber',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'roleIds',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      isMultiple: true,
      options: []
    },
    {
      field: 'projectTeamIds',
      type: 'select',
      label: '项目组',
      placeholder: '请选择项目组',
      isMultiple: true,
      options: []
    }
  ],
  rules: {
    account: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      { min: 2, max: 20, message: '长度需在2~20之间', trigger: 'blur' }
    ],
    userId: [
      {
        required: true,
        message: '请输入账号(学号)',
        trigger: 'blur'
      },
      { min: 6, max: 20, message: '长度需在6~20之间', trigger: 'blur' }
    ],
    password: [
      {
        message: '请输入密码',
        trigger: 'blur'
      },
      { min: 6, max: 20, message: '长度需在6~20之间', trigger: 'blur' }
    ],
    roleId: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'blur'
      }
    ]
    /*     unitPrice: [
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
    ] */
  },
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
