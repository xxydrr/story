import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const JWT_SECRET = process.env.JWT_SECRET as string

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

export const isDevMode = process.env.NODE_ENV === 'development'

export const DATABASE_URL = process.env.DATABASE_URL as string
