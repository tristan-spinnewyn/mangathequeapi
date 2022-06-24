import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TomeService } from './tome.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TomeDto } from './dto/tome.dto';
import { Response } from 'express';
import { User } from '../users/user.decorator';
import { AvisService } from '../avis/avis.service';

@Controller('tome')
export class TomeController {
  constructor(
    private readonly tomeService: TomeService,
    private readonly usersServices: UsersService,
    private readonly avisService: AvisService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() tomeDto: TomeDto,
    @Res() res: Response,
    @User('userId') userId: number,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    await this.tomeService.createOrUpdate(tomeDto, null);
    return res.status(HttpStatus.OK).send();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() tomeDto: TomeDto,
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    const user = await this.usersServices.findById(userId);
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    await this.tomeService.createOrUpdate(tomeDto, params.id);
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  async getAll() {
    return await this.tomeService.findAll();
  }

  @Get('/new')
  async getNew() {
    return await this.tomeService.findLastPublishedTome();
  }

  @Get('/collection')
  async getTomesUser(@User('userId') userId: number) {
    return await this.tomeService.findTomesForUser(userId);
  }

  @Get(':id')
  async getById(@Param() params, @Res() res: Response) {
    const tome = await this.tomeService.findById(params.id);
    if (tome == null) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).json([tome]);
  }

  @Post(':id/add')
  @UseGuards(JwtAuthGuard)
  async addTomeUser(
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    await this.tomeService.addTomeUser(params.id, userId);
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  async delTomeUser(
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    await this.tomeService.delTomeUser(params.id, userId);
    return res.status(HttpStatus.OK).send();
  }

  @Get(':id/avis')
  async getAvis(@Param() params) {
    return await this.avisService.findByTome(params.id);
  }

  @Get(':id/collection')
  async getTomeUser(
    @Res() res: Response,
    @User('userId') userId: number,
    @Param() params,
  ) {
    return res
      .status(200)
      .json([await this.tomeService.findTomeForUser(params.id, userId)]);
  }
}
