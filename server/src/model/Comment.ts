import { Schema, model } from 'mongoose'
import type { Document } from 'mongoose'

interface IComment extends Document {
  content: string
  postId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  _doc: any

}

// Comment type
const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  postId: {
    type: String,
    required: true,
  },
  userId: {
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

const Comment = model<IComment>('Comment', commentSchema)
export default Comment
