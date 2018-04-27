import * as express from 'express'

const router = express.Router()

router.post('/upload', ({ file }: any, res) => {
  res.json({ path: file.filename })
})

export default router
