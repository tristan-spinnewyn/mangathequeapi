import { Injectable } from '@nestjs/common';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { Auteurs } from './auteurs.entity';
import { ILike } from 'typeorm';

@Injectable()
export class AuteursService {
  async create(createAuteursDto: CreateAuteurDto) {
    const auteurs = Auteurs.create(createAuteursDto);
    await auteurs.save();

    return auteurs;
  }

  async update(id: number, editedAuteur: Auteurs) {
    return await Auteurs.update(id, editedAuteur);
  }

  async findById(id: number) {
    return await Auteurs.findOne(id);
  }

  async findAll() {
    return await Auteurs.find();
  }
  async findByName(name: string) {
    return await Auteurs.find({ nameAuteur: ILike(`%${name}%`) });
  }
}
