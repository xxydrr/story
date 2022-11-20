import { useEffect, useState } from 'react'
import type { AxiosRequestConfig } from 'axios'

import { axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut } from '~/utils/http'

type httpFn = <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<T>

export function useGet<T = any, R = any>(url: string, params?: R) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axiosGet<T>(url, { params })
      setData(res)
    }
    catch (err: any) {
      setError(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, fetchData, setData }
}

export function useFetch<T = any, D = any>(fn: httpFn) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function curry() {
    return async function <R>(url: string, reqData?: R, config?: AxiosRequestConfig<D>) {
      setLoading(true)
      try {
        const res = await fn<T>(url, reqData, config)
        setData(res)
      }
      catch (err: any) {
        setError(err.message)
      }
      setLoading(false)
    }
  }
  const fetchData = curry()
  return { data, loading, error, fetchData }
}

export function usePost<T = any, D = any>() {
  return useFetch<T, D>(axiosPost)
}
export function usePut<T = any, D = any>() {
  return useFetch<T, D>(axiosPut)
}
export function usePatch<T = any, D = any>() {
  return useFetch<T, D>(axiosPatch)
}

export function useDelete<R = any, T = any>(url: string, config?: AxiosRequestConfig<T>) {
  const [data, setData] = useState<R>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axiosDelete<R>(url, config)
      setData(res)
    }
    catch (err: any) {
      setError(err)
    }
    setLoading(false)
  }
  return { data, loading, error, fetchData }
}
