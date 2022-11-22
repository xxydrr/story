import { CommentOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Button, Comment } from 'antd'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import type { Count, IComment, IPost } from '../../types'
import { useAuthState } from '~/context/AuthContext'
import { useLikesState } from '~/context/LikesContext'
import { axiosGet, axiosPost, axiosPut } from '~/utils/http'

export interface PostProps {
  post: IPost
}

const Post: FC<PostProps> = ({ post }) => {
  const { likesHandler, likes: contextLikes } = useLikesState()
  const { user } = useAuthState()
  const [showComment, setShowComment] = useState(false)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState<IComment[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isLiked, setIsLiked] = useState<Boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      axiosGet<Count>(`/like/${post._id}/count`).then((res) => { setLikes(res.count) }).catch(() => {
        //  do nothing
      })
      axiosGet<IComment[]>(`/comment/${post._id}`).then(res => setComments(res)).catch(() => {
        //  do nothing
      })
      axiosGet<{ isLiked: boolean }>(`/like/${post._id}/isLiked`).then(res => setIsLiked(res.isLiked)).catch(() => {
        //  do nothing
      })
    }
    fetchData()
  }, [post._id])
  const handleComment = async () => {
    setShowComment(!showComment)
  }
  const handleLike = async (e: any, id: string) => {
    try {
      await axiosPut(`/like/${id}/`)
      setLikes(isLiked ? likes - 1 : likes + 1)
      setIsLiked(!isLiked)
      const count = contextLikes
      likesHandler(isLiked ? count - 1 : count + 1)
    }
    catch (err) {
      // do nothing
    }
  }
  const addComment = async (e: any) => {
    e.preventDefault()
    try {
      const newComment = {
        postId: post._id,
        content: inputRef?.current?.value as string,
      }
      const res = await axiosPost<IComment>('/comment', newComment)
      setComments([...comments, res])
      inputRef.current!.value = ''
    }
    catch (err) {
      // do nothing
    }
  }

  const playPause = () => {
    if (videoRef.current?.paused)
      videoRef.current.play()
    else
      videoRef.current?.pause()
  }

  return (
    <div key={post._id} className="flex flex-col p-4 mt-8 border-b border-solid rounded-lg shadow border-grey-light">
      <div className="flex items-center justify-start">
        <Link to={`/${post.username}`} >
          <img loading="lazy" className="object-cover rounded-full w-9 h-9" src={post.avatar} alt="Profile pic" />
        </Link>

        <div className="ml-2">
          <Link to={`/${post.username}`} className="block mb-0 text-gray-800">{post.username}</Link>

          <span className="text-xs text-gray-500">{format(post.createdAt as Date)}</span>
        </div>
      </div>
      <div >
        <p className="mx-0 my-5 ">{post.title}</p>
        {post.type === 'image' && <img loading="lazy" src={post.content} alt="tweet image" className="object-cover w-full border border-solid rounded-sm border-grey-light max-h-96" />}
        {post.type === 'video' && <div className="relative flex flex-col items-center justify-center h-screen px-3 py-0 text-center text-white lg:max-h-96">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden video-docker">
            <video ref={videoRef} className="absolute object-cover min-w-full min-h-full" autoPlay muted loop>
              <source src={post.content} type="video/mp4" />
            </video>
          </div>
          <div className="w-full h-full opacity-0" onClick={playPause}>

          </div>
        </div>}
      </div>

      <div className="flex justify-around px-0 py-3">
        <div onClick={e => handleLike(e, post._id)} className={`flex items-center cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
          <LikeOutlined /> <span className="ml-1">{`${isLiked ? 'dislike' : 'Like'}`} {likes}</span>
        </div>
        <div onClick={handleComment} className="flex items-center cursor-pointer" ><CommentOutlined /><span className="ml-1">Comment {comments && comments.length}</span></div>
        <div className="flex items-center cursor-pointer" ><ShareAltOutlined /><span className="ml-1">Share 12</span></div>
      </div>
      {showComment
        && (<div className="flex items-center">
          <img className="self-start object-cover rounded-full w-9 h-9" src={user?.avatar} alt="Profile pic" />
          <div className="flex-1 mx-3">

            <input ref={inputRef} className="w-full px-3 border h-9 rounded-2xl" placeholder="input search loading with enterButton" maxLength={120} />

          </div>
          <Button type="primary" shape="round" onClick={addComment} >comment</Button>
        </div>)
      }
      {
        showComment && comments && comments.map((comment, index) => (
          <Comment
            key={index}
            author={<a>{comment.username}</a>}
            avatar={<Avatar src={comment.avatar} />}
            content={
              <p>
                {comment.content}
              </p>
            }
            datetime={
              <span>{format(comment.createdAt as Date)}</span>
            }
          />
        ))

      }
    </div>
  )
}

export default Post
