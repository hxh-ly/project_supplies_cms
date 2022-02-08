import { IForm } from '@/base-ui/form'
export const modelFormConfig: IForm = {
  labelWidth: '80px',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
