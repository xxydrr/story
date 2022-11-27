import './style.scss'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import type { Count, User } from '../../types'
import { useGet } from '~/hooks/useFetch'
import { useAuthState } from '~/context/AuthContext'
import RecommendUser from '~/pages/home/components/RecommendUser'
import { axiosGet } from '~/utils/http'
import { useRelationshipState } from '~/context/RelationshipContext'
const TopBar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [following, setFollowing] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [modelTitle, setModelTitle] = useState('')
  const { user } = useAuthState()
  const { likes, followers: followersCount, followings: followingsCount } = useRelationshipState()
  const { data: posts } = useGet<Count>('/post/count/')
  const showModal = async (e: any, type: string) => {
    setIsModalOpen(true)
    setLoading(true)
    setModelTitle(type)
    try {
      const data = await axiosGet<User[]>(`/relationship/${type}/${user!._id}`)
      setFollowing(data)
    }
    catch (error: any) {
      setError(error)
    }
    setLoading(false)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="h-64 bg-gradient-to-r from-green-400 to-blue-500"></div>

      <div className="bg-white shadow">
        <div className="container flex flex-col items-center mx-auto lg:flex-row lg:relative">
          <div className="w-full lg:w-1/4">
            <img loading="lazy" src={user?.avatar} alt="logo" className="w-32 h-32 rounded-full lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />
          </div>
          <div className="w-full lg:w-1/2">
            <ul className="flex list-reset">

              <li className="px-4 py-3 text-center border-b-2 border-transparent border-solid hover:border-teal">
                <Link to={`/${user?.username}`} className="no-underline text-grey-darker hover:no-underline">
                  <div className="mb-1 text-sm font-bold tracking-tight">Posts</div>
                  <div className="text-lg font-bold tracking-tight hover:text-teal">{posts?.count}</div>
                </Link>
              </li>
              <li className="px-4 py-3 text-center border-b-2 border-transparent border-solid hover:border-teal">
                <div onClick={e => showModal(e, 'followings')} className="no-underline cursor-pointer text-grey-darker">
                  <div className="mb-1 text-sm font-bold tracking-tight">Following</div>
                  <div className="text-lg font-bold tracking-tight hover:text-teal">{followingsCount}</div>
                </div>
              </li>
              <li className="px-4 py-3 text-center border-b-2 border-transparent border-solid hover:border-teal">
                <div onClick={e => showModal(e, 'followers')} className="no-underline cursor-pointer text-grey-darker ">
                  <div className="mb-1 text-sm font-bold tracking-tight">Followers</div>
                  <div className="text-lg font-bold tracking-tight hover:text-teal">{followersCount}</div>
                </div>
              </li>
              <li className="px-4 py-3 text-center border-b-2 border-transparent border-solid hover:border-teal">
                <div className="no-underline text-grey-darker ">
                  <div className="mb-1 text-sm font-bold tracking-tight">Likes</div>
                  <div className="text-lg font-bold tracking-tight hover:text-teal">{likes}</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
      <Modal onOk={handleOk} onCancel={handleCancel} centered title={modelTitle} open={isModalOpen} >
        {<>
          {isModalOpen
            && loading
            ? ('Loading...')
            : error || (
              following && following.map(user => (
                <RecommendUser key={user._id} user={user} isFollowing={modelTitle === 'followers' ? !!user?.isFollowing : true}></RecommendUser>
              ))
            )
          }
        </>}

      </Modal>

    </>
  )
}

export default TopBar
