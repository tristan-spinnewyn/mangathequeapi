import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Edition_user } from '../edition/edition_user.entity';
import { Tome_user } from '../tome/tome_user.entity';
import { Avis } from '../avis/avis.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  active: boolean;

  @Column()
  pseudonyme: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany((type) => Edition_user, (edition_user) => edition_user.user)
  editionUser: Edition_user[];

  @OneToMany((type) => Tome_user, (tome_user) => tome_user.user)
  tomeUser: Tome_user[];

  @OneToMany((type) => Avis, (avis) => avis.user)
  avis: Avis[];
}
