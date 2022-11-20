export interface FormItem {
  name: string
  value: string
  key: string
  label: string
  labelWidth?: string
  placeholder?: string
  options?: Array<{ label: string; value: string; text?: string; key?: string; disabled?: boolean }>
  loading?: boolean
  disabled?: boolean
  filterable?: boolean
  type?: string
  reserve?: boolean
  remote?: boolean
  clearable?: boolean
  remoteMethod?: (query: string) => void
  width?: string
  multiple?: boolean
  valueFormat?: string
  linkPanels?: boolean
  shortcuts?: any
  startPlaceholder?: string
  endPlaceholder?: string
  defaultTime?: string[]
  props?: any
  trueLabel?: string
  falseLabel?: string
}
export interface Field {
  label: string
  prop: string
  total?: number
  align?: string
  width?: string
  sortable?: boolean
  slotName?: string
}

export interface pageParams {
  page: number
  limit: number
}
