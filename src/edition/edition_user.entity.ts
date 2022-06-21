import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Edition } from './edition.entity';

@Entity('edition_user')
export class Edition_user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  note: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Edition, (edition) => edition.id)
  edition: Edition;
}
