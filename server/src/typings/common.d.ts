
/* 通用对象 */
type ObjTy = Record<string, any>

/* ant select组件 options 参数类型 */
type IOptions<T = number> = Array<{
  label: string
  value: T
}>
