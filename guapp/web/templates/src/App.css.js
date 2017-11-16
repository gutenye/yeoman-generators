import { s } from 'vendor'
import { injectGlobal } from 'styled-components'

/* Reset */
// eslint-disable-next-line
injectGlobal`
  * { padding: 0; margin: 0; box-sizing: border-box; }
  a, a:visited { text-decoration: none; color: inherit; }
  img { max-width: 100%; vertical-align: bottom; }
  input { border: 0; }
  input:focus { outline: none; }

  body {
    background-color: #fafafa;
    font-family: ${s.fontFamily};
  }
`
