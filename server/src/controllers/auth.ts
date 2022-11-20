import bcrypt from 'bcryptjs'
// import type { LoginParams, RegisterParams } from './model'
import User from '~/model/User'
import { generateJwt } from '~/utils/auth'

export const register = async (ctx: Context) => {
  const { username, password, email } = ctx.request.body
  if (!username || !password || !email)
    ctx.throw(400, 'Invalid username or password or email')

  const user = await User.find({ $or: [{ username }, { email }] })
  if (user.length)
    ctx.throw(400, 'username or email already exists')

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  const newUser = new User({ username, password: hash, email })
  await newUser.save()
  ctx.responseSuccess('User created successfully', 201)
}

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body
  if (!username || !password)
    ctx.throw(400, 'Invalid username or password')

  let user = await User.findOne({ username })
  if (!user) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({ username, password: hash })
    user = await newUser.save()
  }
  else {
    const isValid = bcrypt.compareSync(password, user!.password)
    if (!isValid)
      ctx.throw(400, 'Invalid username or password')
  }
  // ctx.responseSuccess({ message: 'Login successfully' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: password2, createdAt, isAdmin, updatedAt, ...other } = user!._doc
  const token = generateJwt({ id: user!._id.toString(), isAdmin: !!user!.isAdmin })
  ctx.responseSuccess({ token, user: other, message: 'Login successful' })
}

// logout token invalidation
export const logout = async (ctx: Context) => {
  ctx.state.user = null
  ctx.responseSuccess('Logout successfully', 204)
}
