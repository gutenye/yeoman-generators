export default function(): void

/** styled-components
 * ignore styled-components `${p => p.active}` error
 */
/*
declare module 'styled-components' {
  interface ThemeProps<T> {
    [key: string]: any
  }
}
*/

/** react-router
 * support location.query, history.push({query})
 */
/*
declare module 'history' {
  interface Location {
    query: { [key: string]: string }
  }

  interface LocationDescriptorObject {
    query?: { [key: string]: string }
    keep?: boolean
  }
}
*/
