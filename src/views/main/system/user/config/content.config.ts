export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'userId', label: '用户编号', minWidth: '100' },
    { prop: 'account', label: '账户名称', minWidth: '100' },
    { prop: 'telNumber', label: '手机号码', minWidth: '100' },
   /*  {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    }, */
    // { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'handle', label: '操作', minWidth: '140', slotName: 'handle' },
    { prop: 'roleIds', label: '角色权限', minWidth: '140', slotName: 'roleIds',isHidden:true },

  ],
  isShowId: false,
  isShowSelect: true,
  emitSelectionChange: (value: any) => {
    console.log(value)
  }
}
