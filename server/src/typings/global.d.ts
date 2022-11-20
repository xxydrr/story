/// <reference types="node" />

import type { Context,ParameterizedContext } from 'koa'
import { type } from 'os'


declare global {

  type Context = Context
  type Nullable<T> = T | null
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T> = Readonly<Record<string, T>>
  type Indexable<T = any> = Record<string, T>
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>
  type ImmediateHandle = ReturnType<typeof setImmediate>
}

