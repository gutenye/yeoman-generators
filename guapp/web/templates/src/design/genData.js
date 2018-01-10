import CircularJSON from 'circular-json'
import fs from 'fs'
import path from 'path'
import data from './data'

fs.writeFileSync(path.join(__dirname, 'data.json'), CircularJSON.stringify(data))
