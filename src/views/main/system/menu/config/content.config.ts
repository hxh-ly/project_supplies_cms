export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'label', label: '用户管理', minWidth: '200' },
    { prop: 'level', label: '类型', minWidth: '60' },
    { prop: 'pagePath', label: '菜单url', minWidth: '100' },
    /*  { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' }, */
    /* {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    }, */
    { label: '操作', minWidth: '120', slotName: 'handle' }
  ],
  isShowId: true,
  isShowSelect: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  emitSelectionChange: (value: any) => {
    console.log(value)
  },
  showFooter: false
}
