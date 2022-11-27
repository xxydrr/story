import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

export interface IRelationship extends Document {
  followerId: string
  followingId: string
  createdAt?: Date
  updatedAt?: Date
  _doc: any

}

const relationshipSchema = new Schema<IRelationship>({
  followerId: {
    type: String,
    required: true,
  },
  followingId: {
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

const Relationship = model<IRelationship>('Relationship', relationshipSchema)
export default Relationship
