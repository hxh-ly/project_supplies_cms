export const contentTableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'roleId', label: '角色id', minWidth: '100' },
    { prop: 'name', label: '角色名', minWidth: '100' },
    {prop:'description',label:'角色描述',minWidth:'160'},
   /*  {
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
  isShowId: false,
  isShowSelect: true
  /*  emitSelectionChange: (value: any) => {
    console.log(value)
  } */
}
