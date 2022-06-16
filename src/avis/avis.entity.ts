import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne((type) => Tome, (tome) => tome.id, { eager: true })
  @JoinColumn({ name: 'tomeId' })
  tome: Tome;

  @ManyToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
