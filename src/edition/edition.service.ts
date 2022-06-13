import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Edition } from './edition.entity';
import { Repository } from 'typeorm';
import { Series } from '../series/series.entity';
import { Editeurs } from '../editeurs/editeurs.entity';
import { EditionDto } from './dto/edition.dto';
import { Edition_user } from './edition_user.entity';
import { User } from '../users/user.entity';
import { Edition_userDto } from './dto/edition_user.dto';

@Injectable()
export class EditionService {
  constructor(
    @InjectRepository(Edition)
    private readonly editionRepo: Repository<Edition>,
    @InjectRepository(Series) private readonly seriesRepo: Repository<Series>,
    @InjectRepository(Editeurs)
    private readonly editeursRepo: Repository<Editeurs>,
    @InjectRepository(Edition_user)
    private readonly editionUser: Repository<Edition_user>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createOrUpdate(editionDto: EditionDto, id) {
    const serie = await this.seriesRepo.findOne(editionDto.serieId);
    const editeur = await this.editeursRepo.findOne(editionDto.editeurId);

    if (id == null) {
      await this.editionRepo.save({
        nameEdition: editionDto.nameEdition,
        statut: editionDto.statut,
        serie: serie,
        editeur: editeur,
      });
    } else {
      await this.editionRepo.save({
        id: id,
        nameEdition: editionDto.nameEdition,
        statut: editionDto.statut,
        serie: serie,
        editeur: editeur,
      });
    }
  }

  async findById(id: number) {
    return await this.editionRepo.findOne(id);
  }

  async findAll() {
    return await this.editionRepo.find();
  }

  async findEditionUser(user: User, edition: Edition) {
    return await this.editionUser.findOne({
      where: {
        user: user,
        edition: edition,
      },
    });
  }

  async addOrCreateEditionUser(
    edition_id: number,
    user_id: number,
    editionuserDto: Edition_userDto,
  ) {
    const edition = await this.editionRepo.findOne(edition_id);
    const user = await this.userRepo.findOne(user_id);

    const editionuser = await this.findEditionUser(user, edition);

    if (editionuser == null) {
      await this.editionUser.save({
        user: user,
        edition: edition,
        note: editionuserDto.note,
      });
    } else {
      await this.editionUser.save({
        id: editionuser.id,
        note: editionuserDto.note,
      });
    }
  }

  async delEditionUser(edition_id: number, user_id: number) {
    const edition = await this.editionRepo.findOne(edition_id);
    const user = await this.userRepo.findOne(user_id);

    const editionUser = await this.findEditionUser(user, edition);

    if (editionUser === null) {
      return null;
    }

    await this.editionUser.delete(editionUser);
    return true;
  }
}
