import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/createSeriesDto';
import { Auteurs } from '../auteurs/auteurs.entity';
import { ILike, Repository } from 'typeorm';
import { Series } from './series.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Auteurs)
    private readonly auteurRepo: Repository<Auteurs>,
    @InjectRepository(Series) private readonly serieRepo: Repository<Series>,
  ) {}
  async createOrUpdate(createSeriesDto: CreateSeriesDto, id) {
    const auteurs = await this.auteurRepo.findOne(createSeriesDto.auteurId);

    if (id == null) {
      await this.serieRepo.save({
        nameSeries: createSeriesDto.nameSeries,
        auteur: auteurs,
      });
    } else {
      await this.serieRepo.update(id, {
        nameSeries: createSeriesDto.nameSeries,
        auteur: auteurs,
      });
    }
  }

  async findById(id: number) {
    return await this.serieRepo.findOne(id, {
      select: ['id', 'nameSeries', 'auteur'],
      relations: ['editions'],
    });
  }

  async findAll() {
    return await this.serieRepo.find();
  }

  async findByName(name: string) {
    return await this.serieRepo.find({
      nameSeries: ILike(`%${name}%`),
    });
  }
}
