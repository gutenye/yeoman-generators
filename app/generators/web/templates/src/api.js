import Frisbee from 'frisbee'

const api = new Frisbee({
  baseURI: '/api',
  headers: {'Content-Type': 'application/json'},
})

export default api
