export interface formItem {
  field: string
  type: string
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  downOptions?: any
  isHidden?: boolean
  disable?:boolean
}

export interface IForm {
  modelWidth?: string
  labelWidth: string
  formItem: formItem[]
  itemStyle?: any
  colLayout?: any
  tableList?: any
  rules?: any,

}
