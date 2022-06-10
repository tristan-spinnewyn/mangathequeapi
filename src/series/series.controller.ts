import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSeriesDto } from './dto/createSeriesDto';
import { Response } from 'express';
import { User } from '../users/user.decorator';

@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesServices: SeriesService,
    private readonly usersServices: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSeries: CreateSeriesDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    await this.seriesServices.createOrUpdate(createSeries, null);
    return res.status(HttpStatus.OK);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() createSeries: CreateSeriesDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    await this.seriesServices.createOrUpdate(createSeries, params.id);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll() {
    return await this.seriesServices.findAll();
  }

  @Get(':id')
  async getById(@Param() params) {
    return await this.seriesServices.findById(params.id);
  }
}
