// @flow
import Sequelize from 'sequelize'
import appRc from '../appRc'

export default new Sequelize(appRc.db.url)
