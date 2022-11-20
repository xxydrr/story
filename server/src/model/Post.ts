import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

export interface IPost extends Document {
  userId: string
  title?: string
  content?: string
  type?: string
  createdAt?: Date
  updatedAt?: Date
  _doc: any

}

const postSchema = new Schema<IPost>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['image', 'video'],
  },
  // comments: {
  //   type: Array,
  //   default: [],
  // },
  // likes: {
  //   type: Array,
  //   default: [],
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = model<IPost>('Post', postSchema)
export default Post
