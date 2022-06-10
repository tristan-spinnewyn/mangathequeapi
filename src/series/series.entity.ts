import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auteurs } from '../auteurs/auteurs.entity';

@Entity('series')
export class Series extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameSeries: string;

  @ManyToOne((type) => Auteurs, (auteurs) => auteurs.id)
  auteur: Auteurs;
}
