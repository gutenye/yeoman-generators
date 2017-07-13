import RethinkDBDash from 'rethinkdbdash'
import rc from './rc'

export default RethinkDBDash(rc.db)

function belongsTo() {
}
