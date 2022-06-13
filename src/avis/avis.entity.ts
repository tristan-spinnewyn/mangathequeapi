import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tome } from '../tome/tome.entity';
import { User } from '../users/user.entity';

@Entity('avis')
export class Avis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  commantaire: string;

  @Column()
  signalee: boolean;

  @ManyToOne((type) => Tome, (tome) => tome.id)
  tome: Tome;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;
}
