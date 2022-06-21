import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Edition } from '../edition/edition.entity';

@Entity('editeurs')
export class Editeurs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEditeur: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Edition, (edition) => edition.editeur)
  editions: Edition[];
}
