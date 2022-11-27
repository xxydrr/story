export interface IPost {
  userId: string
  title?: string
  content?: string
  type?: string
  createdAt?: Date
  updatedAt?: Date
  _doc: any
  avatar: string
  _id: string
  username: string
}

export interface NewPost {
  title?: string
  content?: string
  type?: string
}

export interface User {
  _id: string
  username: string
  avatar: string
  isFollowing?: boolean
}

export interface IComment {
  userId: string
  content: string
  avatar: string
  username: string
  createdAt?: Date
  _id: string
}

export interface Count {
  count: number
}
