import * as log from 'consola'

log.level = parseInt(process.env.LOG_LEVEL || '3')

export default log
