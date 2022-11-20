// import './style.scss'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import type { IPost } from '../../types'
import Post from '../Post'
import Share from '../Share'
import { useGet } from '~/hooks/useFetch'
import { useSearchState } from '~/context/SearchContext'

export interface ResResult {
  posts: IPost[]
  count: number
}

export interface FeedProps {
  username?: string | undefined
}

const Feed: FC<FeedProps> = ({ username }) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const { query } = useSearchState()

  const { data, loading, error, fetchData } = useGet<ResResult>(username ? `/post/${username}/profile` : '/post', { page, limit, title: query })

  const changeFeed = () => {
    fetchData()
  }
  useEffect(() => {
    changeFeed()
  }, [page, limit, query])
  const onChange = (page: number, pageSize?: number) => {
    setPage(page)
    setLimit(pageSize || 3)
  }
  return (
    <>
      {

        (<div className="w-full mt-6 mb-4 lg:w-2/3">

          { !username && <Share change={changeFeed}></Share>}
          <>
            {
              loading
                ? ('Loading...')
                : error || (
                  data?.posts?.length && data.posts.map(post => (
                    <Post key={post._id} post={post}></Post>
                  ))
                )
            }
          </>
          <br className="my-2" />
          <div className="p-3">
            <Pagination
              total={data?.count}
              showTotal={total => `Total ${total} items`}
              defaultPageSize={limit}
              defaultCurrent={page}
              onChange={onChange}
            />
         </div>
        </div >
        )
      }
    </>
  )
}

export default Feed
