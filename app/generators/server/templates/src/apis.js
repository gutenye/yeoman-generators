import express from 'express'

const router = express.Router()

router.post('/upload', (req, res) => {
  res.json({path: req.file.filename})
})

export default router
