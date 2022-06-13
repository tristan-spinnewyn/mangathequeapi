import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Edition } from '../edition/edition.entity';
import { Tome_user } from './tome_user.entity';
import { Avis } from '../avis/avis.entity';

@Entity('tome')
export class Tome extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column('text')
  desc: string;

  @Column('integer')
  nbpage: number;

  @Column()
  dateSortie: Date;

  @Column()
  imageCouverture: string;

  @Column({
    unique: true,
  })
  isbn: string;

  @ManyToOne((type) => Edition, (edition) => edition.id)
  edition: Edition;

  @OneToMany((type) => Tome_user, (tome_user) => tome_user.tome)
  tomeUser: Tome_user[];

  @OneToMany((type) => Avis, (avis) => avis.tome)
  avis: Avis[];
}
