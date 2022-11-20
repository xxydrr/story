<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const loginFormRef = $ref<FormInstance>()
const user = reactive({
  username: '',
  password: '',
})
const router = useRouter()
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
})

let loading = $ref(false)
const handleLogin = async () => {
  loginFormRef.validate(async (valid) => {
    if (valid) {
      loading = true
      try {
        await useUserStore().login(user)
        router.push('/')
      }
      catch (error) {
        // console.log(error)
      }
      loading = false
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-gray-100">
    <div class="w-1/2 bg-white rounded-md shadow-lg">
      <div class="flex flex-col items-center p-5 bg-white md:flex-1">
        <h3 class="my-4 text-2xl font-semibold text-gray-700">
          Account Login
        </h3>

        <el-form ref="loginFormRef" :model="user" :rules="rules" label-width="120px" class="flex flex-col items-center justify-centerf">
          <el-form-item class="text-black " prop="username" label="username">
            <el-input
              ref="username" v-model="user.username" placeholder="Username" name="username" type="text"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="password" label="password">
            <el-input
              ref="password" v-model="user.password" placeholder="Password" name="password" type="password"
              autocomplete="on"
            />
          </el-form-item>
          <el-button type="primary" :loading="loading" @click="handleLogin">
            Login
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ep-form-item__content)  {
  flex-wrap: nowrap;
  margin-left: 0;
  color: gray;
}
:deep(.ep-input__inner),
:deep(.ep-form-item__label) {
  color: gray;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  hidden: true
</route>
