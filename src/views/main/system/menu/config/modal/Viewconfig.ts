import { IForm } from '@/base-ui/form'
export const menuViewConfig: IForm = {
  actionType:'addMenu',
  labelWidth: '80px',
  formItem: [
    {
      field: 'pagePath',
      type: 'input',
      label: '路径',
      placeholder: '请输入路径如(/xxx)',
    },
    {
      field: 'menuName',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    // {
    //   field: 'sort',
    //   type: 'input',
    //   label: '用户密码',
    //   placeholder: '请输入密码',
    //   isHidden: false
    // },
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
export const pageViewConfig: IForm = {
  actionType:'addPage',
  labelWidth: '80px',
  formItem: [
    {
      field: 'menuName',
      type: 'input',
      label: '页面名称',
      placeholder: '请输入页面名称'
    },
    {
      field: 'pagePath',
      type: 'input',
      label: '路径',
      placeholder: '请输入路径'
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
export const permissionViewConfig: IForm = {
  actionType:'addPermission',
  labelWidth: '80px',
  formItem: [
    {
      field: 'menuName',
      type: 'input',
      label: '权限名字',
      placeholder: '请输入权限名字',
    },
    {
      field: 'permissionName',
      type: 'input',
      label: '权限标识',
      placeholder: '请输入权限标识如 (user:add)'
    },
    {
      field: 'apiPath',
      type: 'input',
      label: '正则',
      placeholder: '请输入apiPath 如(/user/delete/**)'
    }
  ],
  itemStyle: {
    padding: ''
  },
  colLayout: {
    span: 24
  }
}
