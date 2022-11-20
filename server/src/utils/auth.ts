import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '~/config'

interface signTokenOptions {
  id: string
  isAdmin: boolean
}

export const authJwt = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.header.authorization || ''
  if (token.startsWith('Bearer ')) {
    const tokenStr = token.substring(7)
    try {
      const user = await jwt.verify(tokenStr, JWT_SECRET)
      ctx.state.user = user
    }
    catch (err) {
      ctx.throw(401, 'Invalid token')
    }
  }
  else {
    ctx.throw(401, 'Invalid token')
  }
  await next()
}

// 生成 jwt
export const generateJwt = (user: signTokenOptions) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' })
}

// 验证用户的权限
export const verifyAdmin = async (ctx: Context, next: () => Promise<any>) => {
  if (ctx.state.user.isAdmin)
    await next()
  else
    ctx.throw(403, 'You are not admin')
}

