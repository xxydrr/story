import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'

export interface ResData<T> {
  message: string
  result: T
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    // 请求头 token配置
    const token = getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data

    if (response.status.toString().startsWith('20'))
      return res
    else
      ElMessage.error(res.message || 'Error')
  },
  (error) => {
    const messages = error.response?.data?.message
    if (error.response.status === 401) {
      ElMessage.error(messages || 'Error')
      removeToken()
      location.reload()
    }

    else if (messages) { ElMessage.error(messages || 'Error') }

    return Promise.reject(error)
  },
)

export function axiosGet<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get<any, T>(url, config)
}
export function axiosPost<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig<R>): Promise<T> {
  return instance.post<any, T, R>(url, data, config)
}
export function axiosPut<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig<R>): Promise<T> {
  return instance.put<any, T, R>(url, data, config)
}
export function axiosPatch<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig<R>): Promise<T> {
  return instance.patch<any, T, R>(url, data, config)
}

export function axiosDelete<T = any, R = any>(url: string, config?: AxiosRequestConfig<R>): Promise<T> {
  return instance.delete<any, T>(url, config)
}
export function axiosRequest<T>(config: AxiosRequestConfig): Promise<T> {
  return instance.request<any, T>(config)
}

