//import 'normalize.css'
import { s } from 'vendor'
import { injectGlobal } from 'styled-components'

/* Reset */
// eslint-disable-next-line
injectGlobal`
  * { padding: 0; margin: 0; box-sizing: border-box; }
  a, a:visited { text-decoration: none; color: inherit; }
  img, video { max-width: 100%; vertical-align: bottom; }
  input, textarea { border: none; }
  input:focus, textarea:focus { outline: none; }

  body {
    background-color: white;
    font-family: Helvetica,Arial,sans-serif;
  }
`
