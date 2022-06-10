import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Editeurs } from '../editeurs/editeurs.entity';
import { Series } from '../series/series.entity';
import { Edition_user } from './edition_user.entity';

@Entity('edition')
export class Edition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEdition: string;

  @Column()
  statut: string;

  @ManyToOne((type) => Editeurs, (editeurs) => editeurs.id)
  editeur: Editeurs;

  @ManyToOne((type) => Series, (series) => series.id)
  serie: Series;

  @OneToMany((type) => Edition_user, (edition_user) => edition_user.edition)
  editionUser: Edition_user[];
}
