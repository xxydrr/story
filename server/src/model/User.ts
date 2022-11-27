import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  email?: string
  phone?: Number
  avatar?: string
  isAdmin?: boolean
  roles?: string[]
  desc?: string
  country?: string
  city?: string
  createdAt?: Date
  updatedAt?: Date
  _doc: any
  _id: any
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    sparse: true,
  },
  phone: {
    type: Number,
    max: 50,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  avatar: {
    type: String,
    default: 'http://res.cloudinary.com/ibbicode/image/upload/v1663029226/nswmsauudfj1xk1fv8ij.jpg',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: Array,
    default: ['user'],
  },
  desc: {
    type: String,
    max: 50,
  },
  country: {
    type: String,
    max: 50,
  },
  city: {
    type: String,
    max: 50,
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

const User = model<IUser>('User', userSchema)
export default User
