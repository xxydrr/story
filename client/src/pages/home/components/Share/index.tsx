import { FileImageOutlined, SmileOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
// import axios from 'axios'
import type { NewPost } from '../../types'
import { useAuthState } from '~/context/AuthContext'
import { axiosPost } from '~/utils/http'

export interface ShareProps {
  change: () => void
}

const Share: FC<ShareProps> = ({ change }) => {
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { user } = useAuthState()
  const [file, setFile] = useState<File | null>(null)
  const handleClick = async (e: any) => {
    e.preventDefault()
    if (!textareaRef.current?.value!.trim() && !file)
      return
    setLoading(true)
    try {
      let newPost: NewPost = {
        title: textareaRef?.current?.value,
      }
      if (file) {
        const data = new FormData()
        data.append('file', file)
        // your static server
        // data.append('upload_preset', 'your_cloudinary_preset_name')
        // data.append('cloud_name', 'your_cloudinary_cloud_name')
        // const res = await axios.post('url', data)
        newPost = {
          ...newPost,
          // content: res.data.url,
          type: file.type.includes('video') ? 'video' : 'image',
        }
      }
      await axiosPost('/post', newPost)
      file && setFile(null)
      textareaRef.current!.value = ''
      change()
    }
    catch (err) {
      console.error(err)
    }
    setLoading(false)
  }
  return (
    <div className="flex flex-col w-full px-5 py-5 mx-0 rounded-lg shadow mb-5transition-colors ">
      <div className="flex items-center ">
        <img className="self-start object-cover rounded-full w-9 h-9" src={user?.avatar} alt="Profile pic" />
        {/* <input ref={desc} className=" border-none outline-none my-0 mx-2 py-0 px-2.5 rounded-full text-sm  bg-slate-50  text-gray-600  flex-1" type="text" placeholder="What's on your mind, Sathish?" /> */}
        <div className="flex-1 mx-3">

          <textarea className="w-full p-2 border" ref={textareaRef} rows={3} placeholder="Share today's mood" maxLength={220} />

        </div>
        <Button loading={loading} type="primary" shape="round" onClick={handleClick}>share</Button>
      </div>
      <div className="flex flex-wrap justify-around pt-2 mt-3 overflow-hidden border-t h-14">
        <div className="flex-grow p-2.5 flex text-red-400 rounded-lg  items-center  text-sm ">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="videofile">
            <VideoCameraAddOutlined className="my-0 text-xl " />
            <span className="ml-1">Video</span>
          </label>
          <input
            type="file"
            id="videofile"
            onChange={e => setFile(e.target.files![0])}
            className="hidden"
            accept="video/*"
          />
        </div>
        <div className=" flex-grow p-2.5 flex text-green-500  rounded-lg  items-center  text-sm ">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="imgfile">
            <FileImageOutlined />
            <span>Photo</span>
          </label>
          <input
            type="file"
            id="imgfile"
            onChange={e => setFile(e.target.files![0])}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
          />

        </div>
        <div className="flex-grow p-2.5  text-orange-400 flex cursor-pointer rounded-lg  items-center  text-sm ">
          <SmileOutlined />
          <span className="ml-1 ">Feeling</span>
        </div>
      </div>
      {file && file.type.includes('image')
        && (<p><img src={URL.createObjectURL(file)} alt="tweet image" className="object-cover w-full border border-solid rounded-sm border-grey-light max-h-96" /></p>)
      }
      {file && file.type.includes('video') && (<section className="relative flex flex-col items-center justify-center h-screen px-3 py-0 text-center text-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden video-docker">
          <video className="absolute object-cover min-w-full min-h-full" autoPlay muted loop>
            <source src={URL.createObjectURL(file)} type="video/mp4" />
          </video>
        </div>
      </section>)}
    </div>
  )
}

export default Share
