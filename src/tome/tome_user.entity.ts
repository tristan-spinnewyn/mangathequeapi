import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Tome } from './tome.entity';

@Entity('tome_user')
export class Tome_user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Tome, (tome) => tome.id, { eager: true })
  tome: Tome;
}
