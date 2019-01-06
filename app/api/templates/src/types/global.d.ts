declare function pd(...args: any[]): any

interface Obj<T = any> {
  [key: string]: T
}

declare namespace NodeJS {
  interface Global {
    // for test
    loadFixtures: any
  }
}
