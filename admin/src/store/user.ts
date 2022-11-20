import { acceptHMRUpdate, defineStore } from 'pinia'
import { getUserInfo, login as userLogin, logout as userLogout } from '~/api/user'
import type { loginParams } from '~/api/user/types'
import { getToken, removeToken, setToken } from '~/utils/auth'
import router from '~/router'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const username = ref('')
  const avatar = ref('')
  const roles = ref<string[]>([])

  function resetToken() {
    token.value = ''
    roles.value = []
    removeToken()
  }

  function login(data: loginParams) {
    return new Promise<string>((resolve, reject) => {
      userLogin(data)
        .then((res) => {
          setToken(res.token)
          token.value = res.token
          resolve(res.message)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  function getInfo() {
    return new Promise<string[]>((resolve, reject) => {
      getUserInfo().then((res) => {
        username.value = res.username
        avatar.value = res.avatar
        roles.value = res.roles
        resolve(res.roles)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  async function logout() {
    await userLogout()
    resetToken()
    router.push('/login')
  }

  return {
    token,
    username,
    avatar,
    roles,
    login,
    getInfo,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

