import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Series } from '../series/series.entity';

@Entity('auteurs')
export class Auteurs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameAuteur: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Series, (series) => series.auteur)
  series: Series[];
}
