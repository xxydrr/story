export interface successResponse {
  data?: any
  msg?: string
  status?: number
}
export interface errorResponse {
  error?: any
  msg?: string
  status?: number
}

const handleResponse = () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.responseSuccess = (payload: any, status = 200) => {
      ctx.status = status
      if (typeof payload === 'string') {
        ctx.body = {
          message: payload,
        }
      }
      else {
        ctx.body = payload
      }
    }
    await next()
  }
}
export default handleResponse
