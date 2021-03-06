const rules = {
  name: [
    {
      required: true,
      message: '必填项',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,12}$/,
      message: '长度为5-12个数字或者字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必填项',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '长度为5-10个字符',
      trigger: 'blur'
    }
  ]
}
export { rules }
