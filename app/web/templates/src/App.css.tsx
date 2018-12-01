import { createGlobalStyle } from 'styled-components'

// eslint-disable-next-line
export default createGlobalStyle`
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
