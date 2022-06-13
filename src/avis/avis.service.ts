import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avis } from './avis.entity';
import { Repository } from 'typeorm';
import { Tome } from '../tome/tome.entity';
import { User } from '../users/user.entity';
import { AvisDto } from './dto/avis.dto';
import { TomeService } from '../tome/tome.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis) private readonly avisRepo: Repository<Avis>,
    @Inject(TomeService) private readonly tomeRepo: Repository<Tome>,
    @Inject(UsersService) private readonly userRepo: Repository<User>,
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
