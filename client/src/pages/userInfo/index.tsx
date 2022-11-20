import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

import axios from 'axios'
import {
  FileImageOutlined,
} from '@ant-design/icons'
import { userInputs } from './formSource'
import type { User } from '~/context/AuthContext'
import { useAuthDispatch, useAuthState } from '~/context/AuthContext'
import { axiosPut } from '~/utils/http'
import Layout from '~/layouts/default'
const UserInfo: FC = () => {
  const { user } = useAuthState()

  const [info, setInfo] = useState<User>({})
  const [file, setFile] = useState<File | null>(null)

  const [inputs] = useState(userInputs)
  const dispatch = useAuthDispatch()

  useEffect(() => {
    setInfo(user || {})
  }, [user])
  const inputHandler = (e: any) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e: any) => {
    e.preventDefault()

    try {
      let newInfo = info
      if (file) {
        const data = new FormData()
        data.append('file', file as any)
        data.append('upload_preset', 'ibbicode')
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/ibbicode/image/upload',
          data,
        )
        const { url } = uploadRes.data
        newInfo = {
          ...info,
          avatar: url,
        }
      }
      const res = await axiosPut('/user', newInfo)
      setInfo(res)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res })
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <div className="flex flex-full">

        <div className="flex p-2 m-5 shadow">
          <div className="flex items-center justify-center w-1/3 text-center ">
              <img
                className="object-cover w-20 h-20 rounded-full"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : info?.avatar
                }
                alt=""
              />
          </div>
          <div className="w-2/3 px-5 py-0">
            <form className="flex flex-wrap justify-between gap-7">
              <div className="w-2/5">
                <label className="flex items-center gap-3 cursor-pointer" htmlFor="file">
                  Image:<span className="w-8 h-8" ><FileImageOutlined style={{ fontSize: '24px' }} /></span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={e => setFile(e.target.files![0])}
                  className="hidden"
                />
              </div>

              {inputs.map(input => (
                <div className="w-2/5" key={input.id}>
                  <label className="flex items-center gap-3">{input.label}</label>
                  <input
                    className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    onChange={inputHandler}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    value={info![input.id as keyof typeof info] ?? ''}
                  />
                </div>
              ))}
              <Button type="primary" onClick={handleClick}>Save</Button>
            </form>
          </div>
        </div>
      </div>

    </Layout>

  )
}

export default UserInfo
