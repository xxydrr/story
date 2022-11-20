import mongoose from 'mongoose'
import { DATABASE_URL } from '~/config'

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB')
        resolve(null)
      }).catch((err) => {
        console.error(err)
        reject(err)
      },
      )
  })
}

export default connectDB
