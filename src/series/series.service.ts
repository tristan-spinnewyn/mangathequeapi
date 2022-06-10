import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/createSeriesDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auteurs } from '../auteurs/auteurs.entity';
import { Repository } from 'typeorm';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Auteurs) private readonly auteurRepo: Repository<Auteurs>,
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
      await this.serieRepo.save({
        id: id,
        nameSeries: createSeriesDto.nameSeries,
        auteur: auteurs,
      });
    }
  }

  async findById(id: number) {
    return await this.serieRepo.findOne(id);
  }

  async findAll() {
    return await this.serieRepo.find();
  }
}
