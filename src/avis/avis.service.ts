import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avis } from './avis.entity';
import { Repository } from 'typeorm';
import { Tome } from '../tome/tome.entity';
import { User } from '../users/user.entity';
import { AvisDto } from './dto/avis.dto';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis) private readonly avisRepo: Repository<Avis>,
    @InjectRepository(Tome) private readonly tomeRepo: Repository<Tome>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createOrUpdate(avisDto: AvisDto, id) {
    const tome = await this.avisRepo.findOne(avisDto.tomeId);
    const user = await this.userRepo.findOne(avisDto.userId);

    if (id == null) {
      await this.avisRepo.save({
        commantaire: avisDto.commantaire,
        user: user,
        tome: tome,
        signalee: false,
      });
    } else {
      await this.avisRepo.save({
        commantaire: avisDto.commantaire,
        user: user,
        tome: tome,
        signalee: false,
        id: id,
      });
    }
  }

  async signalee(id) {
    const avis = await this.avisRepo.findOne(id);
    if (avis == null) return null;
    avis.signalee = true;
    await this.avisRepo.save(avis);
  }

  async findByTome(tomeId: number) {
    const tome = await this.tomeRepo.findOne(tomeId);
    return await this.avisRepo.find({
      where: {
        tome: tome,
      },
    });
  }

  async findSignalee() {
    return await this.avisRepo.find({
      where: {
        signalee: true,
      },
    });
  }

  async deleteComment(id: number) {
    return await this.avisRepo.delete(id);
  }
}
