import type { StoreUser, UserInfo, loginParams, loginResult } from './types'
import { axiosGet, axiosPost } from '~/utils/http'

export function login(data: loginParams) {
  return axiosPost<loginResult>('/auth/login', data)
}

export function getUserInfo() {
  return axiosGet<StoreUser>('/user')
}

export function logout() {
  return axiosPost<{ message: string }>('/auth/logout')
}

export function getUsers() {
  return axiosGet<UserInfo[]>('/user/all')
}
