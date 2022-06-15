import { Injectable } from '@nestjs/common';
import { CreateEditeurDto } from './dto/create-editeur.dto';
import { Editeurs } from './editeurs.entity';
import { ILike } from 'typeorm';

@Injectable()
export class EditeursService {
  async create(createEditeursDto: CreateEditeurDto) {
    const editeurs = Editeurs.create(createEditeursDto);
    await editeurs.save();

    return editeurs;
  }

  async update(id: number, currentEditeur: Editeurs) {
    return await Editeurs.update(id, currentEditeur);
  }

  async findById(id: number) {
    return await Editeurs.findOne(id);
  }

  async findAll() {
    return await Editeurs.find();
  }

  async findByName(name: string) {
    return await Editeurs.find({
      nameEditeur: ILike(`%${name}%`),
    });
  }
}
