// these APIs are auto-imported from @vueuse/core
/**
 *
 * @param {formList} 筛选form参数
 * @param {listQuery} 一般是分页的参数(可以其他查询参数）
 *
 */
export const mergeQuery = (formList: FormItem[], listQuery = {}) => {
  const formQuery = formList.reduce((obj: any, item): Record<string, any> => {
    obj[item.key] = item.value
    return obj
  }, {})

  return { ...listQuery, ...formQuery }
}

