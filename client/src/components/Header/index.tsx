import { Link, NavLink } from 'react-router-dom'
import type { FC } from 'react'
import { useState } from 'react'
import { Input } from 'antd'
import {
  CaretDownOutlined,
  GithubOutlined,
  HomeOutlined,
  LogoutOutlined,
  RightOutlined,
  // MessageOutlined,
  // SettingOutlined,
  // UserOutlined,
} from '@ant-design/icons'
import { useSearchState } from '~/context/SearchContext'

import { useAuthDispatch, useAuthState } from '~/context/AuthContext'
import type { IUser } from '~/context/AuthContext'
import { axiosPost } from '~/utils/http'
import './style.scss'

const { Search } = Input

interface MenuType {
  url: string
  icon: React.ReactNode
  text: string
}

const menu: MenuType[] = [
  { url: '/', text: 'Home', icon: <HomeOutlined /> },
  // { url: '/chat', text: 'Chat', icon: <MessageOutlined /> },
  // { url: '/books', text: 'Books', icon: 'carbon:add-alt' },
  // { url: '/contact', text: 'Contact', icon: <UserOutlined /> },
]
const submenu = [
  { text: 'Logout', icon: <LogoutOutlined /> },
]
const Header: FC = () => {
  const { user } = useAuthState() as { user: IUser }
  const dispatch = useAuthDispatch()
  const { searchHandler } = useSearchState()
  const [isshowsubmenu, setIsShowSubmenu] = useState(false)
  const showSubmenu = () => {
    setIsShowSubmenu(!isshowsubmenu)
  }
  const logout = async (text: string) => {
    if (text === 'Logout')
      await axiosPost('/auth/logout')
    dispatch({ type: 'LOGOUT' })
  }
  const onSearch = (value: string) => {
    searchHandler(value)
  }
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-gray-50">
      <div className="container flex items-center justify-between w-full px-4 py-4 mx-auto ">
        <div className="flex ">
          <a className="flex items-center mx-2 text-lg" rel="noreferrer" href="https://github.com/xxydrr/story" target="_blank" title="GitHub">
            <GithubOutlined />
          </a>
          <div className="w-1/4">
            <div className="relative mr-4 text-gray-500">
              <Search
                placeholder="input search posts"
                allowClear
                enterButton="Search"
                onSearch={onSearch}
                style={{ width: 200 }}
                className="dashboardSearch"
              />
            </div>
          </div>
        </div>
        <nav className="justify-center flex-1 hidden md:flex">
          <ul className="flex items-center gap-6 menu-container lg:gap-12">
            {menu.map(item => (
              <li key={item.text}>
                <NavLink
                  className="text-3xl text-gray-300 hover:text-gray-500"
                  to={item.url}
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 1/5">
          <div className="relative">
            <div className="flex items-center justify-center mx-2 bg-gray-100 rounded-full w-9 h-9" onClick={showSubmenu} ><CaretDownOutlined /></div>

            {isshowsubmenu && <div className="absolute z-10 p-2 rounded-xl right-2.5 top-10
             bg-white  shadow-lg w-80">
              <ul className="flex flex-col">
                <li className="p-1 border-b ">
                  <div className="flex items-center justify-start ">
                    <Link to="/userinfo" >
                      <img src={user.avatar} className="mx-0 my-2 ml-1 rounded-full cursor-pointer w-14 h-14" alt="" />
                    </Link>
                    <div className="ml-2">
                      <p className="text-base font-semibold">{user.username}</p>
                      <span className="text-sm text-gray-500" >{user.email}</span>
                    </div>
                  </div>
                </li>
                {submenu.map(item => (
                  <li className="p-2 border-b cursor-pointer hover:bg-gray-200" key={item.text} onClick={() => logout(item.text)} >
                    <div className="flex items-center justify-between px-2 ">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-gray-100 rounded-full">{item.icon}</div>
                        <p className="mb-1 nowrap">{item.text}</p>
                      </div>
                      <div className="text-xl font-bold"><RightOutlined /></div>
                    </div>
                  </li>
                ))

                }

              </ul>
            </div>}

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
