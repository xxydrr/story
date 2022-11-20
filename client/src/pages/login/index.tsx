import type { FC } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { useAuthDispatch, useAuthState } from '~/context/AuthContext'
import { setToken } from '~/utils/auth'
import { usePost } from '~/hooks/useFetch'
export interface ReqParams {
  username: string
  password: string
}
export interface responseData {
  token: string
  user: any
  message: string
}
const Login: FC = () => {
  const { redirectPath } = useAuthState()

  const { data, loading, fetchData } = usePost<responseData>()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data?.user })
      setToken(data.token)
      navigate(redirectPath)
    }
  }, [data])
  const onFinish = async (values: any) => {
    fetchData('/auth/login', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div
        className="w-1/2 bg-white rounded-md shadow-lg"
      >
        <div className="flex flex-col items-center p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                Login
              </Button>

            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  )
}

export default Login
