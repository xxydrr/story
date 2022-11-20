import { ReloadOutlined } from '@ant-design/icons'
import type { FC } from 'react'
import RecommendUser from '../RecommendUser'
import { useGet } from '~/hooks/useFetch'

export interface User {
  _id: string
  username: string
  avatar: string
}

const Suggestion: FC = () => {
  const { data: users, loading, error, fetchData } = useGet<User[]>('/user/recommend')
  const handleReFetch = () => {
    fetchData()
  }
  return (
    <div className={'w-full pl-4 mt-6 lg:w-1/3'}>
      <div className="p-3 mb-3 ">

        <div className="px-3 py-5 shadow ">
          <div className="flex justify-between">
            <span className="flex-1 text-lg font-bold">
              Suggestions For You
            </span>

            <span onClick={handleReFetch}><ReloadOutlined className="flex items-center justify-center p-1 border rounded-full hover:border-blue-300 hover:text-blue-800 visited:text-blue-700" /></span>

          </div>
          {<>
            {
              loading
                ? ('Loading...')
                : error || (
                  users && users.map(user => (
                    <RecommendUser key={user._id} user={user}></RecommendUser>
                  ))
                )
            }
          </>}
        </div>

      </div>

    </div>
  )
}

export default Suggestion
