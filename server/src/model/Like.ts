import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

export interface ILike extends Document {
  userId: string
  postId: string
  createdAt?: Date
  updatedAt?: Date
  _doc: any

}

const likesSchema = new Schema<ILike>({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Like = model<ILike>('Like', likesSchema)
export default Like
