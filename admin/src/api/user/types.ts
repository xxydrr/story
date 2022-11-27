export interface loginParams {
  username: string
  password: string
}
export interface loginResult {
  token: string
  user: any
  message: string
}

export interface StoreUser {
  username: string
  avatar: string
  roles: string[]
}
export interface UserInfo {
  username: string
  email: string
  phone: string
  roles: string[]
  desc: string
  country: string
  city: string
  createdAt: string
}

export const getUsersUrl = '/user/all'
