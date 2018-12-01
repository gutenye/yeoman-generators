declare function pd(...args: any[]): any
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
