import { Injectable } from '@nestjs/common';
import { CreateEditeurDto } from './dto/create-editeur.dto';
import { Editeurs } from './editeurs.entity';

@Injectable()
export class EditeursService {
  async create(createEditeursDto: CreateEditeurDto) {
    const editeurs = Editeurs.create(createEditeursDto);
    await editeurs.save();

    return editeurs;
  }

  async update(createEditeursDto: CreateEditeurDto, currentEditeur: Editeurs) {
    return await Editeurs.save(
      Object.assign(currentEditeur, createEditeursDto),
    );
  }

  async findById(id: number) {
    return await Editeurs.findOne(id);
  }

  async findAll() {
    return await Editeurs.find();
  }
}
