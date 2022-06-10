import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auteurs } from '../auteurs/auteurs.entity';
import { Edition } from '../edition/edition.entity';

@Entity('series')
export class Series extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameSeries: string;

  @ManyToOne((type) => Auteurs, (auteurs) => auteurs.id)
  auteur: Auteurs;

  @OneToMany((type) => Edition, (edition) => edition.serie)
  editions: Edition[];
}
