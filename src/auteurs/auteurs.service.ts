import { Injectable } from '@nestjs/common';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { Auteurs } from './auteurs.entity';

@Injectable()
export class AuteursService {
  async create(createAuteursDto: CreateAuteurDto) {
    const auteurs = Auteurs.create(createAuteursDto);
    await auteurs.save();

    return auteurs;
  }

  async update(createAuteursDto: CreateAuteurDto, currentAuteur: Auteurs) {
    return await Auteurs.save(Object.assign(currentAuteur, createAuteursDto));
  }

  async findById(id: number) {
    return await Auteurs.findOne(id);
  }

  async findAll() {
    return await Auteurs.find();
  }
}
