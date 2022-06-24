import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Tome } from './tome.entity';
import { TomeDto } from './dto/tome.dto';
import { Edition } from '../edition/edition.entity';
import { Tome_user } from './tome_user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TomeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Tome) private readonly tomeRepo: Repository<Tome>,
    @InjectRepository(Edition)
    private readonly editionRepo: Repository<Edition>,
    @InjectRepository(Tome_user)
    private readonly tomeUserRepo: Repository<Tome_user>,
  ) {}

  async createOrUpdate(tomeDto: TomeDto, id) {
    const edition = await this.editionRepo.findOne(tomeDto.editionId);

    if (id == null) {
      await this.tomeRepo.save({
        numero: tomeDto.numero,
        desc: tomeDto.desc,
        dateSortie: tomeDto.dateSortie,
        nbpage: tomeDto.nbpage,
        isbn: tomeDto.isbn,
        edition: edition,
        imageCouverture: tomeDto.imageCouverture,
      });
    } else {
      await this.tomeRepo.update(id, {
        numero: tomeDto.numero,
        desc: tomeDto.desc,
        dateSortie: tomeDto.dateSortie,
        nbpage: tomeDto.nbpage,
        isbn: tomeDto.isbn,
        edition: edition,
        imageCouverture: tomeDto.imageCouverture,
      });
    }
  }

  async findById(id: number) {
    return await this.tomeRepo.findOne(id, { relations: ['avis'] });
  }

  async findAll() {
    return await this.tomeRepo.find();
  }

  async findLastPublishedTome() {
    const dateNow = new Date();
    return await this.tomeRepo.find({
      where: {
        dateSortie: LessThanOrEqual(dateNow),
      },
      relations: ['edition'],
      order: {
        dateSortie: 'DESC',
      },
      take: 6,
    });
  }

  async findTomeUser(user: User, tome: Tome) {
    return await this.tomeUserRepo.findOne({
      where: {
        user: user,
        tome: tome,
      },
    });
  }

  async findTomesForUser(user_id: number) {
    const user = await this.userRepo.findOne(user_id);
    return await this.tomeUserRepo.find({
      where: { user: user },
      relations: ['tome', 'tome.edition', 'tome.edition.tomes'],
    });
  }

  async findTomeForUser(tome_id: number, user_id: number) {
    const user = await this.userRepo.findOne(user_id);
    const tome = await this.tomeRepo.findOne(tome_id);

    return await this.findTomeUser(user, tome);
  }

  async addTomeUser(tome_id: number, user_id: number) {
    const user = await this.userRepo.findOne(user_id);
    const tome = await this.tomeRepo.findOne(tome_id);

    const tomeuser = await this.findTomeUser(user, tome);
    if (tomeuser == null) {
      await this.tomeUserRepo.save({
        user: user,
        tome: tome,
      });
    }
  }

  async delTomeUser(tome_id: number, user_id: number) {
    const user = await this.userRepo.findOne(user_id);
    const tome = await this.tomeRepo.findOne(tome_id);

    const tomeuser = await this.findTomeUser(user, tome);

    await this.tomeUserRepo.delete(tomeuser);
  }
}
