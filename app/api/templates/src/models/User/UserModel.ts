import { Entity, Column } from 'typeorm'
import Model from '../Model'

@Entity()
class User extends Model {
  @Column({ unique: true })
  username: string
  @Column('char', { length: 60 })
  password: string
}

export default User
