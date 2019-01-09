// eslint-disable-next-line no-unused-vars
declare function pd(...args: any[]): any

// eslint-disable-next-line no-unused-vars
declare function pdMobx(...args: any[]): any

interface Obj<T = any> {
  [key: string]: T
}

declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

declare module '*.txt' {
  const content: string
  export default content
}

interface Window {
  [key: string]: any
}
