import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

class Model extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date
}

export default Model
