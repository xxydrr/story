import type { Ref } from 'vue'
import { axiosGet } from '~/utils/http'
export function useFetch<T = any, R = object>(url: Ref<string>, params?: R) {
  const data = ref<T>()
  const loading = ref(false)
  const error = ref(null)
  const fetchData = async () => {
    loading.value = true
    try {
      const res = await axiosGet<T>(unref(url), { params: toRaw(params) })
      data.value = res
    }
    catch (err: any) {
      error.value = err
    }
    loading.value = false
  }
  watch([url, params], () => {
    fetchData()
  }, {
    deep: true,
    immediate: true,
  })
  return {
    data,
    loading,
    error,
    fetchData,
  }
}

